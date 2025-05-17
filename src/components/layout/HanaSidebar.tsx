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
  X,
  CalendarDays,
  BadgeAlert
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookOpen } from '@/components/SidebarIcons';
import OverviewTab from '../overview/OverviewTab';
import { Badge } from '@/components/ui/badge';
import { patientData } from '@/data/patientData';
import { Progress } from '@/components/ui/progress';
import { Activity, CircleCheck, FileText as FileTextIcon } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'agents' | 'careLog' | 'billing'>('overview');
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
          
          {/* Patient Quick Information */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <BadgeAlert className="w-5 h-5 mr-2 text-[#1E4D36]" />
              Patient Information
            </h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{patientData.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Age:</span>
                <span className="font-medium">{patientAge} years</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Last Contact:</span>
                <span className="font-medium">{lastContactedFormatted}</span>
              </p>
            </div>
            <div className="mt-3">
              <p className="text-gray-500 mb-2">Conditions:</p>
              <div className="flex flex-wrap gap-2">
                {medicalConditions.map((condition, index) => (
                  <Badge key={index} variant="outline" className="bg-[#E6F0EE] text-[#1E4D36] border-[#1E4D36]">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs - With sticky positioning */}
          <div className="sticky top-0 z-10 flex overflow-x-auto p-4 gap-3 bg-white border-b border-gray-200">
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
          
          {/* Add white background to create space */}
          <div className="bg-white h-4"></div>
          
          {/* Tab Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === 'overview' && <OverviewTabModified />}
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

// Modified OverviewTab that includes medical history list but removes blood pressure
const OverviewTabModified = () => {
  return (
    <div className="bg-[#E6F0EE] p-4 rounded-lg space-y-6">
      {/* Medical History Section */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <CalendarDays className="mr-2 text-[#1E4D36]" size={18} />
          Medical History Summary
        </h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#1E4D36] mr-2">•</span>
              <div>
                <span className="font-medium">Major Depressive Disorder, Recurrent</span>
                <span className="text-sm text-gray-500 ml-2">Diagnosed {new Date(patientData.diagnosis.date).toLocaleDateString()}</span>
              </div>
            </li>
            {patientData.medicalHistory.pastConditions.map((condition, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#1E4D36] mr-2">•</span>
                <div>
                  <span className="font-medium">{condition.condition}</span>
                  <span className="text-sm text-gray-500 ml-2">Diagnosed {new Date(condition.diagnosedDate).toLocaleDateString()}</span>
                  <p className="text-sm text-gray-600">{condition.notes}</p>
                </div>
              </li>
            ))}
            {patientData.medicalHistory.allergies.map((allergy, index) => (
              <li key={`allergy-${index}`} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <div>
                  <span className="font-medium">Allergy: {allergy.allergen}</span>
                  <span className="text-sm text-gray-500 ml-2">Severity: {allergy.severity}</span>
                  <p className="text-sm text-gray-600">{allergy.reaction}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Priority Tasks Section - Kept from original OverviewTab */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileTextIcon className="mr-2 text-[#1E4D36]" size={18} />
          Priority Tasks
        </h3>
        
        <div className="space-y-4">
          {priorityTasks.map(task => (
            <Drawer key={task.id}>
              <DrawerTrigger asChild>
                <div 
                  className="border-l-4 border-l-[#1E4D36] pl-4 pr-2 py-2 bg-white rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        {task.icon}
                        <span className="font-medium text-gray-900">{task.title}</span>
                        <Badge className={`bg-${task.statusColor}-100 text-${task.statusColor}-600 border-0`}>
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <p className="text-sm text-gray-600">ID: {task.id} Due: {task.dueDate}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ArrowUpRight size={16} />
                    </Button>
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{task.title}</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <p className="mb-4 text-gray-600">{task.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">ID: {task.id}</span>
                    <Badge className={`bg-${task.statusColor}-100 text-${task.statusColor}-600`}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Due: <span className="font-medium">{task.dueDate}</span></p>
                  <DrawerClose asChild>
                    <Button className="w-full mt-6 bg-[#1E4D36] hover:bg-[#2A6349]">
                      Go to Care Tasks
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </section>

      {/* Current Status - Modified to remove blood pressure */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <Activity className="mr-2 text-[#1E4D36]" size={18} />
          Current Status
        </h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Medication Adherence</span>
                <span className="text-sm font-medium text-amber-500">Needs Attention</span>
              </div>
              <Progress value={60} className="h-2 bg-gray-100" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Depression (PHQ-9)</span>
                <span className="text-sm font-medium text-red-500">High</span>
              </div>
              <Progress value={30} className="h-2 bg-gray-100" />
            </div>
            
            <div className="pt-2">
              <Badge className="bg-green-100 text-green-700 border-green-200 mr-2">
                <CircleCheck size={14} className="mr-1" />
                Bloodwork Complete
              </Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                <CircleCheck size={14} className="mr-1" />
                Follow-up Scheduled
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <MessageCircle className="mr-2 text-[#1E4D36]" size={18} />
          Engagement
        </h3>
        <Card className="bg-white border-none shadow-sm overflow-hidden">
          <div className="bg-[#1E4D36] px-4 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">AI Conversation History</h4>
                <p className="text-green-100 text-sm">Last call: 2 days ago</p>
              </div>
              <Badge className="bg-green-100 text-green-700">
                Recent Data
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Calls this month</p>
                <p className="text-xl font-medium text-[#1E4D36]">4</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-xl font-medium text-[#1E4D36]">12 min</p>
              </div>
            </div>
            
            <div className="mb-3">
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
          <Card className="bg-white border-none shadow-sm">
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
          <Card className="bg-white border-none shadow-sm">
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
        <Card className="bg-white border-none shadow-sm">
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

export default HanaSidebar;
