
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientData } from '@/data/patientData';
import PatientHeader from '@/components/PatientHeader';
import MedicalHistory from '@/components/MedicalHistory';
import TreatmentPlan from '@/components/TreatmentPlan';
import ProviderNotes from '@/components/ProviderNotes';
import ProviderAssignment from '@/components/ProviderAssignment';
import { 
  Brain, CalendarCheck, ClockAlert, Heart, MessageCircle, ArrowUpRight, Check, 
  AlertTriangle, FileText, Users as UsersIcon, Calendar, ClipboardList
} from 'lucide-react';
import { BookOpen } from '@/components/SidebarIcons';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const newPatientData = {
    name: "Sthita Pujari",
    age: 27,
    gender: "Male",
    lastContact: "3 days ago",
    conditions: ["Hypertension", "Type 2 Diabetes", "Depression"],
    careProgram: "Chronic Care Management"
  };

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
              <h1 className="text-2xl font-bold text-primary">Hana Compass</h1>
            </div>
            <div className="flex items-center gap-4">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <button 
                    className="flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors pulse-animation"
                    aria-label="Open sidebar"
                  >
                    <img 
                      src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                      alt="Hana Clinic Logo" 
                      className="h-8 w-8 object-contain"
                    />
                  </button>
                </SheetTrigger>
                
                <SheetContent width="66.666%" className="overflow-y-auto">
                  <div className="py-6">
                    <div className="flex items-center gap-2 px-6 mb-6">
                      <img 
                        src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                        alt="Hana Clinic Logo" 
                        className="h-8 w-auto"
                      />
                      <span className="text-xl font-bold">Hana Compass</span>
                    </div>
                    
                    {/* Patient Information Header */}
                    <div className="px-6 mb-8">
                      <h2 className="text-3xl font-bold mb-2">{newPatientData.name}</h2>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <span>{newPatientData.age} yrs</span>
                        <span className="mx-2">•</span>
                        <span>{newPatientData.gender}</span>
                        <span className="mx-2">•</span>
                        <span>Last Contact: {newPatientData.lastContact}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge className="px-4 py-1 rounded-full bg-teal-500 text-white">{newPatientData.conditions[0]}</Badge>
                        <Badge className="px-4 py-1 rounded-full bg-teal-500 text-white">{newPatientData.conditions[1]}</Badge>
                        <Badge className="px-4 py-1 rounded-full bg-teal-500 text-white">{newPatientData.conditions[2]}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="px-3 py-1 bg-blue-100 text-blue-600 border border-blue-200">
                          {newPatientData.careProgram}
                        </Badge>
                        
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2 text-green-600">
                            <FileText size={18} />
                            <span className="text-sm">Care Plan Updated: Apr 2</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-600">
                            <Check size={18} />
                            <span className="text-sm">Consent</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Navigation Tabs */}
                      <div className="flex overflow-x-auto gap-2 pb-2">
                        <Button variant="outline" className="flex items-center gap-2 bg-white rounded-lg">
                          <FileText size={18} />
                          <span>Overview</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <ClipboardList size={18} />
                          <span>Care Tasks</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <UsersIcon size={18} />
                          <span>Agents</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Calendar size={18} />
                          <span>Care Log</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <FileText size={18} />
                          <span>Billing</span>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Alert Information */}
                    <div className="px-6 mb-6">
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <AlertTitle className="text-amber-800">Hey, {newPatientData.name.split(" ")[0]}'s PHQ jumped to 13</AlertTitle>
                        <AlertDescription className="text-amber-700">
                          this week (from 8), missed 2 Lisinopril doses and skipped a check-in. Billing's at 19/20. Want to wrap this up?
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    {/* Risk Level */}
                    <div className="px-6 mb-6">
                      <div className="flex justify-between mb-2">
                        <span>Risk Level</span>
                        <span className="text-red-500 font-medium">High Risk</span>
                      </div>
                      <Progress
                        value={85}
                        className="h-2 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400"
                      />
                    </div>
                    
                    {/* Priority Tasks */}
                    <div className="px-6">
                      <h3 className="font-medium mb-4">Priority Tasks</h3>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-500 pl-4 pr-2 py-2 bg-white rounded-md shadow-sm">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <div className="flex items-center gap-2">
                                <ArrowUpRight className="text-red-500" size={18} />
                                <span className="font-medium">PHQ-9 ↑ 13</span>
                                <Badge className="bg-red-100 text-red-600 border-0">Needs Review</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Score increased from 8 on Apr 1</p>
                              <p className="text-sm text-gray-600">ID: T-1001 Due: Today</p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <span>View</span>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-amber-500 pl-4 pr-2 py-2 bg-white rounded-md shadow-sm">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <div className="flex items-center gap-2">
                                <FileText className="text-amber-500" size={18} />
                                <span className="font-medium">Missed Lisinopril</span>
                                <Badge className="bg-amber-100 text-amber-600 border-0">Assigned</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">2 doses missed (Apr 3-4)</p>
                              <p className="text-sm text-gray-600">ID: T-1002 Due: Today</p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <span>View</span>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-center mt-6">
                          <Button variant="link" className="text-blue-500">
                            +1 more tasks
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Patient</span>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                <span>Population</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
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
      
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(155, 135, 245, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(155, 135, 245, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(155, 135, 245, 0);
          }
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        .medical-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        
        .medical-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .medical-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default Index;
