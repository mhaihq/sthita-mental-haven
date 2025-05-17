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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import HanaSidebar from '@/components/layout/HanaSidebar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card backdrop-blur-md bg-white/80">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">CareHealth EHR</h1>
            </div>
            {/* Patient and Population buttons removed */}
          </div>
        </div>
      </header>
      
      <main className="container py-6">
        <PatientHeader patient={patientData} />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0 overflow-x-auto medical-scrollbar">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <Brain className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Session Notes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plan" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Treatment Plan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <Heart className="h-4 w-4" />
              <span>Medical History</span>
            </TabsTrigger>
            <TabsTrigger 
              value="providers" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
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

      {/* Add Hana Sidebar */}
      <HanaSidebar />
      
      <style>
        {`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(30, 77, 54, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(30, 77, 54, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(30, 77, 54, 0);
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

        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default Index;
