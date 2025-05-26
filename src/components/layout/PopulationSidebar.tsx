
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PopulationSidebarTabs } from './sidebar/PopulationSidebarTabs';
import { TaskQueueContent } from './sidebar/population/TaskQueueContent';
import { PatientsListContent } from './sidebar/population/PatientsListContent';
import { CampaignsContent } from './sidebar/population/CampaignsContent';
import { BillingContent } from './sidebar/population/BillingContent';
import { InsightsContent } from './sidebar/population/InsightsContent';
import { useLocation } from 'react-router-dom';

export const PopulationSidebar = () => {
  const [activeTab, setActiveTab] = useState<'taskQueue' | 'patients' | 'campaigns' | 'billing' | 'insights'>('taskQueue');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Adjust positioning based on current page
  const isPatientDetailPage = location.pathname.startsWith('/patient/');
  const iconPosition = isPatientDetailPage ? 'right-4 top-36' : 'right-4 top-20';
  
  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <button 
          className={`flex items-center justify-center w-10 h-10 bg-[#1E4D36] rounded-full shadow-lg hover:bg-[#2A6349] transition-colors pulse-animation fixed ${iconPosition} z-50`}
          aria-label="Open Population Health sidebar"
        >
          <img 
            src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
            alt="Hana Clinic Logo" 
            className="h-6 w-6 object-contain"
          />
        </button>
      </SheetTrigger>
      
      <SheetContent className="p-0 max-w-2/3 w-2/3 border-l border-gray-200 overflow-y-auto bg-[#F1F1F1]">
        <div className="flex flex-col h-full">
          {/* Sidebar Header with Hana Compass branding */}
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
                  <p className="text-sm text-[#2A6349]">Population Health Assistant</p>
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
          
          {/* Population Summary Card */}
          <div className="bg-white m-4 rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#1E4D36]">5</p>
                  <p className="text-xs text-gray-600">Total Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">7</p>
                  <p className="text-xs text-gray-600">Active Tasks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">1</p>
                  <p className="text-xs text-gray-600">High Priority</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <PopulationSidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Tab Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === 'taskQueue' && <TaskQueueContent />}
            {activeTab === 'patients' && <PatientsListContent />}
            {activeTab === 'campaigns' && <CampaignsContent />}
            {activeTab === 'billing' && <BillingContent />}
            {activeTab === 'insights' && <InsightsContent />}
          </div>
          
          {/* Footer */}
          <div className="bg-white shadow-sm p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Hana Compass • Population Health • 5 Active Patients • Last updated: 2 hours ago
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PopulationSidebar;
