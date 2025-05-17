
import React, { useState } from 'react';
import { 
  Brain, 
  CalendarCheck, 
  ClockAlert, 
  Heart, 
  MessageCircle, 
  FileText, 
  Users, 
  Calendar,
  ClipboardList,
  X
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookOpen } from '@/components/SidebarIcons';
import OverviewTab from '../overview/OverviewTab';

export const HanaSidebar = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'agents' | 'careLog' | 'billing'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <button 
          className="flex items-center justify-center w-10 h-10 bg-[#1E4D36] rounded-full shadow-lg hover:bg-[#2A6349] transition-colors pulse-animation fixed right-4 bottom-4 z-50"
          aria-label="Open Hana sidebar"
        >
          <img 
            src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
            alt="Hana Clinic Logo" 
            className="h-8 w-8 object-contain"
          />
        </button>
      </SheetTrigger>
      
      <SheetContent className="p-0 max-w-2/3 w-2/3 border-l border-gray-200 overflow-y-auto bg-[#E6F0EE]">
        <div className="flex flex-col h-full">
          {/* Sidebar Header with frosted glass effect */}
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-md bg-white/70 z-0"></div>
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
          
          {/* Navigation Tabs - Adding better spacing and padding */}
          <div className="flex overflow-x-auto p-4 gap-3 bg-white/50 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'outline'} 
              size="sm"
              className={`px-4 py-2 ${activeTab === 'overview' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Brain size={18} className="mr-2" />
              <span>Overview</span>
            </Button>
            <Button 
              variant={activeTab === 'tasks' ? 'default' : 'outline'} 
              size="sm"
              className={`px-4 py-2 ${activeTab === 'tasks' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <ClipboardList size={18} className="mr-2" />
              <span>Care Tasks</span>
            </Button>
            <Button 
              variant={activeTab === 'agents' ? 'default' : 'outline'} 
              size="sm"
              className={`px-4 py-2 ${activeTab === 'agents' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
              onClick={() => setActiveTab('agents')}
            >
              <Users size={18} className="mr-2" />
              <span>Agents</span>
            </Button>
            <Button 
              variant={activeTab === 'careLog' ? 'default' : 'outline'} 
              size="sm"
              className={`px-4 py-2 ${activeTab === 'careLog' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
              onClick={() => setActiveTab('careLog')}
            >
              <Calendar size={18} className="mr-2" />
              <span>Care Log</span>
            </Button>
            <Button 
              variant={activeTab === 'billing' ? 'default' : 'outline'} 
              size="sm"
              className={`px-4 py-2 ${activeTab === 'billing' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              <FileText size={18} className="mr-2" />
              <span>Billing</span>
            </Button>
          </div>
          
          {/* Tab Content - Fixed padding and spacing */}
          <div className="flex-grow overflow-y-auto p-4 mt-4">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'tasks' && (
              <div>
                <h3 className="font-medium text-xl text-gray-900 mb-4">Care Tasks</h3>
                <p className="text-gray-600">Care tasks content will be displayed here.</p>
              </div>
            )}
            {activeTab === 'agents' && (
              <div>
                <h3 className="font-medium text-xl text-gray-900 mb-4">AI Agents</h3>
                <p className="text-gray-600">Agents content will be displayed here.</p>
              </div>
            )}
            {activeTab === 'careLog' && (
              <div>
                <h3 className="font-medium text-xl text-gray-900 mb-4">Care Log</h3>
                <p className="text-gray-600">Care log and history will be displayed here.</p>
              </div>
            )}
            {activeTab === 'billing' && (
              <div>
                <h3 className="font-medium text-xl text-gray-900 mb-4">Billing</h3>
                <p className="text-gray-600">Billing information will be displayed here.</p>
              </div>
            )}
          </div>
          
          {/* Footer with frosted glass effect */}
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-md bg-white/70 z-0"></div>
            <div className="relative z-10 p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Hana Compass • Patient: Sthita Pujari • Last updated: 3 days ago
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HanaSidebar;
