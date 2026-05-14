import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const API_BASE = 'http://localhost:5000/api';

interface Member {
  id: string;
  name: string;
  age: string;
  relation: string;
  status: 'Safe' | 'Missing';
}

interface FamilyData {
  id: string;
  headName: string;
  contact: string;
  meetingPoint: string;
  members: Member[];
  registeredAt: string;
}

interface FamilyContextType {
  familyData: FamilyData | null;
  registerFamily: (data: any) => Promise<void>;
  updateMemberStatus: (memberId: string, status: 'Safe' | 'Missing') => void;
  resetData: () => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};

export const FamilyProvider = ({ children }: { children: ReactNode }) => {
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedId = localStorage.getItem('wep_family_id');
    if (savedId) {
      fetch(`${API_BASE}/family/${savedId}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) setFamilyData(data);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const registerFamily = async (data: any) => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem('wep_family_id', result.familyId);
        const familyRes = await fetch(`${API_BASE}/family/${result.familyId}`);
        const finalData = await familyRes.json();
        setFamilyData(finalData);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const updateMemberStatus = (memberId: string, status: 'Safe' | 'Missing') => {
    // Local simulation for status updates
    if (familyData) {
      setFamilyData({
        ...familyData,
        members: familyData.members.map(m => m.id === memberId ? { ...m, status } : m)
      });
    }
  };

  const resetData = () => {
    localStorage.removeItem('wep_family_id');
    setFamilyData(null);
  };

  if (loading) return null;

  return (
    <FamilyContext.Provider value={{ familyData, registerFamily, updateMemberStatus, resetData }}>
      {children}
    </FamilyContext.Provider>
  );
};
