
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientData } from '@/data/patientData';
import PatientHeader from '@/components/PatientHeader';
import MedicalHistory from '@/components/MedicalHistory';
import TreatmentPlan from '@/components/TreatmentPlan';
import ProviderNotes from '@/components/ProviderNotes';
import ProviderAssignment from '@/components/ProviderAssignment';
import { Brain, CalendarCheck, ClockAlert, Heart, MessageCircle, ArrowUpRight, Check, AlertTriangle } from 'lucide-react';
import { BookOpen, Calendar, ClipboardList, Info, Users } from '@/components/SidebarIcons';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                alt="Hana Clinic Logo" 
                className="h-10 w-auto"
              />
              <h1 className="text-2xl font-bold text-primary">Mental Health Clinic EHR</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Floating sidebar trigger button with Hana logo and pulse animation */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <button 
            className="fixed top-20 right-6 z-50 flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors pulse-animation"
            aria-label="Open sidebar"
          >
            <img 
              src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
              alt="Hana Clinic Logo" 
              className="h-8 w-8 object-contain"
            />
          </button>
        </SheetTrigger>
        
        <SheetContent className="w-[280px] sm:w-[380px] overflow-y-auto">
          <div className="pt-6 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 px-4 mb-6">
              <img 
                src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                alt="Hana Clinic Logo" 
                className="h-8 w-auto"
              />
              <span>Hana Health</span>
            </h2>
            
            <div className="mb-6 px-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">JS</span>
                  </div>
                  <div>
                    <h3 className="font-medium">James Smith</h3>
                    <p className="text-sm text-muted-foreground">ID: 12345678</p>
                    <div className="flex gap-2 mt-2">
                      <span className="risk-badge high">High Risk</span>
                      <span className="risk-badge medium">Inpatient</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-2">
                  <TabsTrigger value="overview">Patient Overview</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="px-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Risk Assessment</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Self-harm</span>
                            <Badge variant="outline" className="bg-severity-high/20 text-severity-high border-0">High</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Substance Use</span>
                            <Badge variant="outline" className="bg-severity-medium/20 text-severity-medium border-0">Medium</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Violence</span>
                            <Badge variant="outline" className="bg-severity-low/20 text-severity-low border-0">Low</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="px-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Latest Vitals</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Blood Pressure</span>
                            <span className="text-sm font-medium">120/80</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Heart Rate</span>
                            <span className="text-sm font-medium">72 bpm</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Temperature</span>
                            <span className="text-sm font-medium">98.6°F</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="px-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Active Medications</h4>
                        <div className="space-y-2">
                          <div className="text-sm">Sertraline 50mg - Daily</div>
                          <div className="text-sm">Lorazepam 1mg - As needed</div>
                          <div className="text-sm">Trazodone 100mg - At bedtime</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="tasks" className="px-4 space-y-4">
                  <h4 className="font-medium mb-2">Priority Tasks</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start p-3 border rounded-lg bg-muted/30">
                      <div className="task-priority high mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h5 className="font-medium">Crisis Assessment</h5>
                          <span className="text-xs text-muted-foreground">Today</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Complete urgent risk assessment for James Smith</p>
                        <div className="mt-2">
                          <Button size="sm" className="h-7 text-xs">Complete <Check className="ml-1 h-3 w-3" /></Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start p-3 border rounded-lg bg-muted/30">
                      <div className="task-priority high mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h5 className="font-medium">Medication Review</h5>
                          <span className="text-xs text-muted-foreground">Today</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Review medication interactions and side effects</p>
                        <div className="mt-2">
                          <Button size="sm" className="h-7 text-xs">Complete <Check className="ml-1 h-3 w-3" /></Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start p-3 border rounded-lg bg-muted/30">
                      <div className="task-priority medium mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h5 className="font-medium">Family Contact</h5>
                          <span className="text-xs text-muted-foreground">Tomorrow</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Call patient's mother about treatment progress</p>
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="h-7 text-xs">Reschedule</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full text-sm" size="sm">
                      <ArrowUpRight className="mr-1 h-4 w-4" /> View All Tasks
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="px-4">
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Safety Alert</h4>
                      <p className="text-sm text-amber-700">Patient expressed suicidal ideation in last session. Follow safety protocol.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 px-4">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Care Team
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Treatment Plan
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <main className="container py-6">
        <PatientHeader patient={patientData} />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0 overflow-x-auto medical-scrollbar">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Brain className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Session Notes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plan" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Treatment Plan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Heart className="h-4 w-4" />
              <span>Medical History</span>
            </TabsTrigger>
            <TabsTrigger 
              value="providers" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <ClockAlert className="h-4 w-4" />
              <span>Care Team</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <MedicalHistory patient={patientData} />
              </div>
              <div>
                <TreatmentPlan patient={patientData} />
              </div>
            </div>
            <div className="mt-6">
              <ProviderNotes patient={patientData} />
            </div>
          </TabsContent>
          
          <TabsContent value="sessions" className="fade-in">
            <ProviderNotes patient={patientData} />
          </TabsContent>
          
          <TabsContent value="plan" className="fade-in">
            <TreatmentPlan patient={patientData} />
          </TabsContent>
          
          <TabsContent value="history" className="fade-in">
            <MedicalHistory patient={patientData} />
          </TabsContent>
          
          <TabsContent value="providers" className="fade-in">
            <ProviderAssignment />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
