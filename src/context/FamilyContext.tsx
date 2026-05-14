import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
  registerFamily: (data: any) => void;
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
  const [familyData, setFamilyData] = useState<FamilyData | null>(() => {
    const saved = localStorage.getItem('wep_family_data');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (familyData) {
      localStorage.setItem('wep_family_data', JSON.stringify(familyData));
    } else {
      localStorage.removeItem('wep_family_data');
    }
  }, [familyData]);

  const registerFamily = (data: any) => {
    setFamilyData({
      ...data,
      id: `FAM-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      members: data.members.map((m: any, index: number) => ({
        ...m,
        id: `MBR-${Date.now()}-${index}`,
        status: 'Safe',
      })),
    });
  };

  const updateMemberStatus = (memberId: string, status: 'Safe' | 'Missing') => {
    setFamilyData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        members: prev.members.map((m) =>
          m.id === memberId ? { ...m, status } : m
        ),
      };
    });
  };

  const resetData = () => {
    setFamilyData(null);
  };

  return (
    <FamilyContext.Provider value={{ familyData, registerFamily, updateMemberStatus, resetData }}>
      {children}
    </FamilyContext.Provider>
  );
};
