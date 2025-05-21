
import React from 'react';
import { MessageCircle, FileText, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { patientData } from '@/data/patientData';
import { PriorityTaskItem } from './PriorityTaskItem';
import { ArrowUpRight, FileText as FileTextIcon } from '@/components/SidebarIcons';

// Sample data - in a real app, this would come from an API or props
const priorityTasks = [
  {
    id: 'T-1001',
    title: 'PHQ-9 ↑ 13',
    description: 'Score increased from 8 on Apr 1',
    dueDate: 'Today',
    status: 'Needs Review',
    statusColor: 'red',
    icon: <ArrowUpRight className="text-red-500" size={18} />
  },
  {
    id: 'T-1002',
    title: 'Missed Lisinopril',
    description: '2 doses missed (Apr 3-4)',
    dueDate: 'Today',
    status: 'Assigned',
    statusColor: 'amber',
    icon: <FileTextIcon className="text-amber-500" size={18} />
  }
];

// Calculate time since last call
const getTimeSinceLastCall = (): string => {
  // In a real app, this would use actual timestamp data
  const lastCallDate = new Date();
  lastCallDate.setDate(lastCallDate.getDate() - 2); // 2 days ago
  
  const diffInHours = Math.floor((new Date().getTime() - lastCallDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const days = Math.floor(diffInHours / 24);
    return `${days}d ago`;
  }
};

interface ModifiedOverviewTabProps {
  onTaskClick: () => void;
}

export const ModifiedOverviewTab: React.FC<ModifiedOverviewTabProps> = ({ onTaskClick }) => {
  return (
    <div className="bg-[#F1F1F1] p-4 rounded-lg space-y-6">
      {/* Priority Tasks Section */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileTextIcon className="mr-2 text-[#1E4D36]" size={18} />
          Priority Tasks
        </h3>
        
        <div className="space-y-4">
          {priorityTasks.map(task => (
            <PriorityTaskItem 
              key={task.id} 
              task={task} 
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </section>

      {/* Engagement - Enhanced version */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <MessageCircle className="mr-2 text-[#1E4D36]" size={18} />
          Patient Engagement
        </h3>
        <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
          <div className="bg-[#1E4D36] px-4 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">AI Conversation History</h4>
                <p className="text-green-100 text-sm">Last call: 2 days ago</p>
              </div>
              <Badge className="bg-green-100 text-green-700">
                Data from {getTimeSinceLastCall()}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-2 bg-[#F8F8F8] rounded-lg">
                <p className="text-sm text-gray-600">Calls this month</p>
                <p className="text-xl font-medium text-[#1E4D36]">4</p>
              </div>
              <div className="text-center p-2 bg-[#F8F8F8] rounded-lg">
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-xl font-medium text-[#1E4D36]">12 min</p>
              </div>
              <div className="text-center p-2 bg-[#F8F8F8] rounded-lg">
                <p className="text-sm text-gray-600">Engagement</p>
                <p className="text-xl font-medium text-[#1E4D36]">High</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Conversation Topics</h5>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-50 text-blue-700 border-blue-100">Medication</Badge>
                <Badge className="bg-purple-50 text-purple-700 border-purple-100">Sleep</Badge>
                <Badge className="bg-pink-50 text-pink-700 border-pink-100">Stress</Badge>
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100">Work</Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <span className="text-[#1E4D36] mr-2">•</span>
                  Reports feeling better after medication adjustment
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D36] mr-2">•</span>
                  Expressed concerns about side effects
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D36] mr-2">•</span>
                  Mentioned upcoming work deadline causing stress
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Flags</h5>
              <Alert className="bg-amber-50 border-amber-200 py-2">
                <AlertTitle className="text-amber-800 text-sm font-medium">Attention Needed</AlertTitle>
                <AlertDescription className="text-amber-700 text-xs mt-1">
                  Mentioned feeling overwhelmed at work
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Billing Overview */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileTextIcon className="mr-2 text-[#1E4D36]" size={18} />
          Billing Overview
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900">BHI G2214</h4>
              <p className="text-sm text-gray-600 mb-3">Initial Assessment</p>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Time Used</span>
                  <span className="text-gray-900 font-medium">35/50 min</span>
                </div>
                <Progress value={70} className="h-2 bg-gray-100" />
              </div>
              
              <div className="text-right">
                <span className="text-xs text-gray-500">
                  15 minutes remaining
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900">BHI 99484</h4>
              <p className="text-sm text-gray-600 mb-3">Monthly Service</p>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Time Used</span>
                  <span className="text-gray-900 font-medium">12/20 min</span>
                </div>
                <Progress value={60} className="h-2 bg-gray-100" />
              </div>
              
              <div className="text-right">
                <span className="text-xs text-gray-500">
                  8 minutes remaining
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calendar Quick View */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <CalendarDays className="mr-2 text-[#1E4D36]" size={18} />
          Upcoming Appointments
        </h3>
        <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between p-2 border-b">
              <div>
                <h4 className="font-medium text-gray-900">Follow-up: Dr. Chen</h4>
                <p className="text-sm text-gray-600">Mon, Apr 15 • 3:00 PM</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Virtual</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <div>
                <h4 className="font-medium text-gray-900">Blood Pressure Check</h4>
                <p className="text-sm text-gray-600">Wed, Apr 24 • 10:30 AM</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700">In-person</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
