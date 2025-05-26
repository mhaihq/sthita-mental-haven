
import React, { useState } from 'react';
import { X, BadgeAlert } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { patientData } from '@/data/patientData';
import { ModifiedOverviewTab } from './sidebar/ModifiedOverviewTab';
import { SidebarTabs } from './sidebar/SidebarTabs';
import { CareTasksContent } from './sidebar/CareTasksContent';
import { AgentsCareLogContents } from './sidebar/AgentsCareLogContents';
import { BillingContent } from './sidebar/BillingContent';
import { PatientInfoCard } from './sidebar/PatientInfoCard';

// Calculate patient age based on date of birth
const calculateAge = (dateOfBirth: string) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const HanaSidebar = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'careLog' | 'billing'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Calculate patient age
  const patientAge = calculateAge(patientData.dateOfBirth);
  
  // Get relevant medical conditions for quick reference
  const medicalConditions = [
    ...(patientData.medicalHistory.pastConditions.map(condition => condition.condition)),
    patientData.diagnosis.primary
  ];
  
  // Format last contacted date (using the latest session date)
  const lastContactedDate = new Date(patientData.sessionNotes[0]?.date || '');
  const lastContactedFormatted = lastContactedDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  // Handler to switch to tasks tab when priority task is clicked
  const handleTaskClick = () => {
    setActiveTab('tasks');
  };
  
  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <button 
          className="flex items-center justify-center w-10 h-10 bg-[#1E4D36] rounded-full shadow-lg hover:bg-[#2A6349] transition-colors pulse-animation fixed right-4 top-20 z-50"
          aria-label="Open Hana sidebar"
        >
          <img 
            src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
            alt="Hana Clinic Logo" 
            className="h-8 w-8 object-contain"
          />
        </button>
      </SheetTrigger>
      
      <SheetContent className="p-0 max-w-2/3 w-2/3 border-l border-gray-200 overflow-y-auto bg-[#F1F1F1]">
        <div className="flex flex-col h-full">
          {/* Sidebar Header with modern minimal design */}
          <div className="relative bg-white shadow-sm">
            <div className="relative z-10 flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                  alt="Hana Clinic Logo" 
                  className="h-14 w-auto"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#1E4D36]">Hana Compass</h2>
                  <p className="text-sm text-[#2A6349]">Patient Care Assistant</p>
                </div>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100/50"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Patient Quick Information Card */}
          <PatientInfoCard 
            patientData={patientData} 
            patientAge={patientAge}
            lastContactedFormatted={lastContactedFormatted}
            medicalConditions={medicalConditions}
          />
          
          {/* Navigation Tabs - With sticky positioning */}
          <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Tab Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === 'overview' && <ModifiedOverviewTab onTaskClick={handleTaskClick} />}
            {activeTab === 'tasks' && <CareTasksContent />}
            {activeTab === 'careLog' && <AgentsCareLogContents type="careLog" />}
            {activeTab === 'billing' && <BillingContent />}
          </div>
          
          {/* Footer with minimal design */}
          <div className="bg-white shadow-sm p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Hana Compass • Patient: Sthita Pujari • Last updated: 3 days ago
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HanaSidebar;
