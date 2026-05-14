import React, { createContext, useContext, useState, useEffect } from 'react';

const FamilyContext = createContext();

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};

export const FamilyProvider = ({ children }) => {
  const [familyData, setFamilyData] = useState(() => {
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

  const registerFamily = (data) => {
    setFamilyData({
      ...data,
      id: `FAM-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      members: data.members.map((m, index) => ({
        ...m,
        id: `MBR-${Date.now()}-${index}`,
        status: 'Safe', // Default status
      })),
    });
  };

  const updateMemberStatus = (memberId, status) => {
    setFamilyData((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === memberId ? { ...m, status } : m
      ),
    }));
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
