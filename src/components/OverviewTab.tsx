
import React from 'react';
import { ArrowRight, Check, Bell, Calendar, CalendarDays, Clock, ChartBar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

// Define mock conditions if not available from patientData
const patientConditions = ["Hypertension", "Type 2 Diabetes", "Depression"];

const OverviewTab = () => {
  // Data for priority tasks
  const priorityTasks = [
    {
      id: "T-1001",
      title: "PHQ-9 ↑ 13",
      description: "Score increased from 8 on Apr 1",
      due: "Today",
      status: "Needs Review",
      statusColor: "red",
      icon: ArrowRight,
    },
    {
      id: "T-1002",
      title: "Missed Lisinopril",
      description: "2 doses missed (Apr 3-4)",
      due: "Today",
      status: "Assigned",
      statusColor: "amber",
      icon: Check,
    },
    {
      id: "T-1003",
      title: "Blood Pressure Check",
      description: "Follow-up required",
      due: "Tomorrow",
      status: "Pending",
      statusColor: "blue",
      icon: ArrowRight,
    }
  ];

  // Data for engagement
  const engagementData = {
    lastCalled: "Yesterday, 3:45 PM",
    callThisMonth: 6,
    completedCalls: 18,
    callCompletion: 85,
    insights: [
      { text: "Reported difficulty with sleep", severity: "medium" },
      { text: "Skipped medications twice", severity: "high" },
      { text: "Feeling more anxious at work", severity: "medium" }
    ],
    dataFreshness: "Recent"
  };

  // Data for billing overview
  const billingData = [
    { 
      title: "Time Billed", 
      icon: Clock, 
      current: 48, 
      total: 60, 
      unit: "minutes",
      code: "99484"
    },
    { 
      title: "Days Until Reset", 
      icon: CalendarDays, 
      current: 22, 
      total: 30, 
      unit: "days",
      code: "99484" 
    },
    { 
      title: "Monthly Progress", 
      icon: ChartBar, 
      current: 16, 
      total: 20, 
      unit: "tasks",
      code: "99484" 
    },
    { 
      title: "Upcoming Sessions", 
      icon: Calendar, 
      current: 2, 
      total: 4, 
      unit: "planned",
      code: "99484" 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Priority Tasks */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Priority Tasks</h2>
        <div className="space-y-3">
          {priorityTasks.map((task) => (
            <Sheet key={task.id}>
              <SheetTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <task.icon className={`text-${task.statusColor}-500`} size={18} />
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={`bg-${task.statusColor}-100 text-${task.statusColor}-600 border-0`}>{task.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <p className="text-sm text-gray-600">ID: {task.id} Due: {task.due}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        View <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SheetTrigger>
              <SheetContent width="66.666%" side="right" className="overflow-y-auto">
                <div className="py-6">
                  <h2 className="text-2xl font-bold mb-4">Care Tasks</h2>
                  <div className="space-y-4">
                    {/* Care tasks would be listed here */}
                    <Card>
                      <CardContent className="p-4">
                        <h3>Patient Care Tasks</h3>
                        <p>This section would show detailed care tasks and allow for management.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>

      {/* Current Status */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Treatment Progress</h3>
                    <p className="text-sm text-gray-600">BHI CPT Code 99484</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">On Track</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Depression (PHQ-9)</span>
                    <span className="text-red-500 font-medium">13 pts (↑5)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Anxiety (GAD-7)</span>
                    <span className="text-amber-500 font-medium">8 pts (↑2)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Medication Adherence</span>
                    <span className="text-red-500 font-medium">76% (↓12%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "76%" }}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Follow-up Status</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm">Blood work completed on Apr 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm">Psychiatrist appointment scheduled for Apr 18</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="text-amber-500" size={18} />
                      <span className="text-sm">Needs to schedule physical therapy</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Conditions</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {patientConditions.map((condition, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700">{condition}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Engagement */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Engagement</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium text-lg">Hana AI Interactions</h3>
                <p className="text-sm text-gray-600">Data freshness: <span className="text-green-600 font-medium">{engagementData.dataFreshness}</span></p>
              </div>
              <Badge className={`${engagementData.callCompletion > 80 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {engagementData.callCompletion}% Completion
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Last Interaction</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Bell className="text-blue-500" size={18} />
                    <span className="font-medium">{engagementData.lastCalled}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Month to Date</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Bell className="text-blue-500" size={18} />
                    <span className="font-medium">{engagementData.callThisMonth} calls</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Completed</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Check className="text-green-500" size={18} />
                    <span className="font-medium">{engagementData.completedCalls} calls</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium mb-2">Key Insights from Calls</h4>
                <div className="space-y-2">
                  {engagementData.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className={`mt-1 w-2 h-2 rounded-full ${insight.severity === 'high' ? 'bg-red-500' : insight.severity === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                      <p className="text-sm">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Billing Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Billing Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {billingData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPT {item.code}</span>
                    <span className="font-medium">{item.current}/{item.total} {item.unit}</span>
                  </div>
                  <Slider 
                    value={[Math.floor((item.current / item.total) * 100)]} 
                    max={100} 
                    step={1} 
                    disabled 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
