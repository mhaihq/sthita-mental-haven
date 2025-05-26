
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { patientsData } from '@/data/patientsData';
import PatientListView from '@/components/PatientListView';

const Index = () => {
  const navigate = useNavigate();

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card backdrop-blur-md bg-white/80">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">CareHealth EHR</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-6">
        <PatientListView 
          patients={patientsData} 
          onPatientClick={handlePatientClick}
        />
      </main>
    </div>
  );
};

export default Index;
