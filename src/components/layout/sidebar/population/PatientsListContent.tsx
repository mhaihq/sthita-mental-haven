
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, AlertTriangle, Eye } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import { useNavigate } from 'react-router-dom';

const PatientCard: React.FC<{ patient: typeof patientsData[0] }> = ({ patient }) => {
  const navigate = useNavigate();
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Mild': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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

  const handleViewDetails = () => {
    if (patient.isClickable) {
      navigate(`/patient/${patient.id}`);
    }
  };

  const handleQuickAction = () => {
    navigate(`/patient/${patient.id}`);
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm text-[#1E4D36]">{patient.name}</h3>
              <p className="text-xs text-gray-600">ID: {patient.id}</p>
            </div>
            <Badge className={`text-xs ${getSeverityColor(patient.severity)}`}>
              {patient.severity}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <User size={12} />
              <span>{calculateAge(patient.dateOfBirth)}y, {patient.gender}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar size={12} />
              <span>{new Date(patient.lastVisit).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="text-xs">
            <p className="text-gray-700 font-medium">{patient.primaryDiagnosis}</p>
            <p className="text-gray-500">{patient.diagnosisCode}</p>
          </div>
          
          {patient.nextAppointment && (
            <div className="text-xs text-blue-600">
              Next: {new Date(patient.nextAppointment).toLocaleDateString()}
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-6 px-2 text-xs flex-1"
              onClick={handleViewDetails}
              disabled={!patient.isClickable}
            >
              <Eye size={12} className="mr-1" />
              View Details
            </Button>
            <Button 
              size="sm" 
              className="h-6 px-2 text-xs bg-[#1E4D36] hover:bg-[#2A6349]"
              onClick={handleQuickAction}
            >
              <AlertTriangle size={12} className="mr-1" />
              Quick Action
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PatientsListContent: React.FC = () => {
  const activePatients = patientsData.filter(patient => patient.status === 'Active');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1E4D36]">Patient Population</h2>
        <Badge variant="outline" className="text-xs">
          {activePatients.length} Active Patients
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto medical-scrollbar">
        {activePatients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2 pt-2 border-t">
        <div className="text-center">
          <p className="text-xs text-gray-500">High Risk</p>
          <p className="font-medium text-sm text-red-600">
            {activePatients.filter(p => p.severity === 'Severe').length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Medium Risk</p>
          <p className="font-medium text-sm text-yellow-600">
            {activePatients.filter(p => p.severity === 'Moderate').length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Low Risk</p>
          <p className="font-medium text-sm text-green-600">
            {activePatients.filter(p => p.severity === 'Mild').length}
          </p>
        </div>
      </div>
    </div>
  );
};
