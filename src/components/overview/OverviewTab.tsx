
import React from 'react';
import { 
  ArrowUpRight, 
  FileText, 
  MessageSquare, 
  Activity, 
  CalendarDays, 
  CircleCheck 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

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
    icon: <FileText className="text-amber-500" size={18} />
  }
];

const billingCodes = [
  {
    code: 'BHI G2214',
    description: 'Initial Assessment',
    timeUsed: 35,
    timeTotal: 50,
    percentComplete: 70
  },
  {
    code: 'BHI 99484',
    description: 'Monthly Service',
    timeUsed: 12,
    timeTotal: 20,
    percentComplete: 60
  }
];

const patientEngagement = {
  callsThisMonth: 4,
  lastCallDate: '2 days ago',
  averageDuration: '12 min',
  insights: [
    "Reports feeling better after medication adjustment",
    "Expressed concerns about side effects"
  ],
  flags: [
    "Mentioned feeling overwhelmed at work",
    "Possible sleep disturbance"
  ],
  dataFreshness: "Recent", // "Recent", "Moderate", "Stale"
};

const OverviewTab = () => {
  return (
    <div className="bg-[#E6F0EE] p-4 rounded-lg space-y-6">
      {/* Priority Tasks Section */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileText className="mr-2 text-[#1E4D36]" size={18} />
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

      {/* Current Status */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <Activity className="mr-2 text-[#1E4D36]" size={18} />
          Current Status
        </h3>
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Blood Pressure</span>
                  <span className="text-sm font-medium text-green-600">Normal</span>
                </div>
                <Progress value={80} className="h-2 bg-gray-100" />
              </div>
              
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
          </CardContent>
        </Card>
      </section>

      {/* Engagement */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <MessageSquare className="mr-2 text-[#1E4D36]" size={18} />
          Engagement
        </h3>
        <Card className="bg-white border-none shadow-sm overflow-hidden">
          <div className="bg-[#1E4D36] px-4 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">AI Conversation History</h4>
                <p className="text-green-100 text-sm">Last call: {patientEngagement.lastCallDate}</p>
              </div>
              <Badge className={`
                ${patientEngagement.dataFreshness === "Recent" ? "bg-green-100 text-green-700" : 
                  patientEngagement.dataFreshness === "Moderate" ? "bg-amber-100 text-amber-700" : 
                  "bg-red-100 text-red-700"}
              `}>
                {patientEngagement.dataFreshness} Data
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Calls this month</p>
                <p className="text-xl font-medium text-[#1E4D36]">{patientEngagement.callsThisMonth}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-xl font-medium text-[#1E4D36]">{patientEngagement.averageDuration}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {patientEngagement.insights.map((insight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#1E4D36] mr-2">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Flags</h5>
              <Alert className="bg-amber-50 border-amber-200 py-2">
                <AlertTitle className="text-amber-800 text-sm font-medium">Attention Needed</AlertTitle>
                <AlertDescription className="text-amber-700 text-xs mt-1">
                  {patientEngagement.flags[0]}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Billing Overview */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileText className="mr-2 text-[#1E4D36]" size={18} />
          Billing Overview
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {billingCodes.map((code, index) => (
            <Card key={index} className="bg-white border-none shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900">{code.code}</h4>
                <p className="text-sm text-gray-600 mb-3">{code.description}</p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Time Used</span>
                    <span className="text-gray-900 font-medium">{code.timeUsed}/{code.timeTotal} min</span>
                  </div>
                  <Progress value={code.percentComplete} className="h-2 bg-gray-100" />
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    {code.timeTotal - code.timeUsed} minutes remaining
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
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

export default OverviewTab;
