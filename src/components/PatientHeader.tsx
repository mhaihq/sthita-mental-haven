
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { PatientData } from '@/data/patientData';
import { Button } from "@/components/ui/button";

interface PatientHeaderProps {
  patient: PatientData;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patient }) => {
  // Calculate age from DOB
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const patientAge = calculateAge(patient.dateOfBirth);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'bg-severity-low text-white';
      case 'Moderate': return 'bg-severity-medium text-black';
      case 'Severe': return 'bg-severity-high text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="mb-6 overflow-hidden border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <Badge variant="outline" className="ml-2 border-primary/50 text-primary">
                  ID: {patient.id}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(patient.dateOfBirth)} ({patientAge} yrs)</span>
                </div>
                <div>{patient.gender}</div>
                <div>{patient.contactInfo.phone}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            <Badge className={`${getSeverityColor(patient.diagnosis.severity)}`}>
              {patient.diagnosis.severity} Depression
            </Badge>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Complete Profile
            </Button>
            <Button size="sm" className="w-full sm:w-auto">
              New Session
            </Button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Primary Diagnosis</div>
            <div className="font-medium">{patient.diagnosis.primary}</div>
            <div className="text-xs text-muted-foreground">ICD-10: {patient.diagnosis.code}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Insurance</div>
            <div className="font-medium">{patient.insurance.provider}</div>
            <div className="text-xs text-muted-foreground">Policy: {patient.insurance.policyNumber}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Emergency Contact</div>
            <div className="font-medium">{patient.emergencyContact.name}</div>
            <div className="text-xs text-muted-foreground">{patient.emergencyContact.relationship} • {patient.emergencyContact.phone}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Primary Provider</div>
            <div className="font-medium">{patient.diagnosis.diagnosedBy}</div>
            <div className="text-xs text-muted-foreground">Since {formatDate(patient.diagnosis.date)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHeader;
