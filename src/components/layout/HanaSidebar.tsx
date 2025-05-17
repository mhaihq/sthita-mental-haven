
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  CalendarCheck, 
  ClockAlert, 
  Heart, 
  MessageCircle, 
  FileText, 
  Users, 
  Calendar,
  ClipboardList
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookOpen } from '@/components/SidebarIcons';
import OverviewTab from '../overview/OverviewTab';

export const HanaSidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'agents' | 'careLog' | 'billing'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Helper function to check if a path is active
  const isActive = (path: string) => location.pathname === path;
  
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
      
      <SheetContent className="p-0 max-w-md w-full border-l border-gray-200 overflow-y-auto bg-[#E6F0EE]">
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-[#1E4D36] text-white p-4">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                alt="Hana Clinic Logo" 
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-bold">Hana Compass</h2>
            </div>
            <p className="text-sm text-green-100 mt-1">Patient Care Assistant</p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-1 p-2 bg-white border-b border-gray-200">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'overview' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <Brain size={16} className="mr-1" />
              <span>Overview</span>
            </Button>
            <Button 
              variant={activeTab === 'tasks' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'tasks' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
              onClick={() => setActiveTab('tasks')}
            >
              <ClipboardList size={16} className="mr-1" />
              <span>Care Tasks</span>
            </Button>
            <Button 
              variant={activeTab === 'agents' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'agents' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
              onClick={() => setActiveTab('agents')}
            >
              <Users size={16} className="mr-1" />
              <span>Agents</span>
            </Button>
            <Button 
              variant={activeTab === 'careLog' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'careLog' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
              onClick={() => setActiveTab('careLog')}
            >
              <Calendar size={16} className="mr-1" />
              <span>Care Log</span>
            </Button>
            <Button 
              variant={activeTab === 'billing' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'billing' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
              onClick={() => setActiveTab('billing')}
            >
              <FileText size={16} className="mr-1" />
              <span>Billing</span>
            </Button>
          </div>
          
          {/* Tab Content */}
          <div className="flex-grow overflow-y-auto">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'tasks' && (
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-4">Care Tasks</h3>
                <p className="text-gray-600">Care tasks content will be displayed here.</p>
              </div>
            )}
            {activeTab === 'agents' && (
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-4">AI Agents</h3>
                <p className="text-gray-600">Agents content will be displayed here.</p>
              </div>
            )}
            {activeTab === 'careLog' && (
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-4">Care Log</h3>
                <p className="text-gray-600">Care log and history will be displayed here.</p>
              </div>
            )}
            {activeTab === 'billing' && (
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-4">Billing</h3>
                <p className="text-gray-600">Billing information will be displayed here.</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-white">
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
