
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { patientsData } from '@/data/patientsData';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PatientsListContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  
  const activePatients = patientsData.filter(patient => patient.status === 'Active');
  
  // Filter patients based on search and severity
  const filteredPatients = activePatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || patient.severity === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });
  
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

  const handleViewProfile = (patient: typeof patientsData[0]) => {
    navigate(`/patient/${patient.id}?openSidebar=true`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1E4D36]">Patient Population</h2>
        <Badge variant="outline" className="text-xs">
          {filteredPatients.length} Patients
        </Badge>
      </div>

      {/* Risk Counters - Moved to top */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-lg border">
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

      {/* Search and Filter Controls */}
      <div className="space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
        
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="Severe">High Risk</SelectItem>
            <SelectItem value="Moderate">Medium Risk</SelectItem>
            <SelectItem value="Mild">Low Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-medium">Patient</TableHead>
              <TableHead className="text-xs font-medium">Age/Gender</TableHead>
              <TableHead className="text-xs font-medium">Severity</TableHead>
              <TableHead className="text-xs font-medium">Last Visit</TableHead>
              <TableHead className="text-xs font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map(patient => (
              <TableRow key={patient.id} className="hover:bg-gray-50">
                <TableCell className="py-2">
                  <div>
                    <p className="font-bold text-xs text-[#1E4D36]">{patient.name}</p>
                    <p className="text-xs text-gray-500">ID: {patient.id}</p>
                    <p className="text-xs text-gray-600 mt-1">{patient.primaryDiagnosis}</p>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="text-xs text-gray-600">
                    <p>{calculateAge(patient.dateOfBirth)}y</p>
                    <p>{patient.gender}</p>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Badge className={`text-xs ${getSeverityColor(patient.severity)}`}>
                    {patient.severity}
                  </Badge>
                </TableCell>
                <TableCell className="py-2">
                  <div className="text-xs text-gray-600">
                    <p>{new Date(patient.lastVisit).toLocaleDateString()}</p>
                    {patient.nextAppointment && (
                      <p className="text-blue-600">
                        Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-6 px-2 text-xs flex items-center gap-1"
                    onClick={() => handleViewProfile(patient)}
                  >
                    <Eye size={10} />
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No patients found matching your search criteria.
        </div>
      )}
    </div>
  );
};
