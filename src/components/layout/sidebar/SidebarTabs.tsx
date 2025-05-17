
import React from 'react';
import { Brain, ClipboardList, Users, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarTabsProps {
  activeTab: 'overview' | 'tasks' | 'agents' | 'careLog' | 'billing';
  setActiveTab: (tab: 'overview' | 'tasks' | 'agents' | 'careLog' | 'billing') => void;
}

export const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-16 py-2 flex items-center z-10 bg-white border-b border-gray-200">
      <div className="flex gap-3 px-4 overflow-hidden">
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
    </div>
  );
};
