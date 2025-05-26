
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle,
  Phone,
  FileText,
  ChevronRight
} from 'lucide-react';

export const BillingContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ready' | 'expiring' | 'under' | 'blocked'>('ready');

  const metrics = [
    {
      title: 'Enrolled Patients',
      value: '247',
      icon: Users,
      color: 'text-[#1E4D36]',
      bgColor: 'bg-[#EBF4F0]'
    },
    {
      title: 'Ready to Bill',
      value: '$24,580',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'At Risk of Expiring',
      value: '12',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Average Time Logged',
      value: '42 min',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const filterTabs = [
    { key: 'ready', label: 'Ready to Bill', count: 18 },
    { key: 'expiring', label: 'Nearing Expiry', count: 12 },
    { key: 'under', label: 'Under Minutes', count: 8 },
    { key: 'blocked', label: 'Blocked', count: 3 }
  ];

  const patients = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 35,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'ready',
      daysRemaining: 5
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 12,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'ready',
      daysRemaining: 8
    },
    {
      id: 'P003',
      name: 'Emma Davis',
      cptCode: '99492',
      description: 'First Month CoCM',
      minutesUsed: 45,
      minutesTotal: 70,
      amount: '$220.00',
      status: 'expiring',
      daysRemaining: 2
    }
  ];

  const atRiskPatients = [
    {
      id: 'P003',
      name: 'Emma Davis',
      cptCode: 'G2214',
      progress: 85,
      daysLeft: 2,
      amount: '$220.00'
    },
    {
      id: 'P004',
      name: 'James Wilson',
      cptCode: '99484',
      progress: 75,
      daysLeft: 3,
      amount: '$180.00'
    },
    {
      id: 'P005',
      name: 'Lisa Anderson',
      cptCode: '99492',
      progress: 90,
      daysLeft: 1,
      amount: '$195.00'
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-red-500';
    if (progress >= 60) return 'bg-orange-500';
    return 'bg-[#1E4D36]';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Ready</Badge>;
      case 'expiring':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Expiring</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold text-[#1E4D36] mb-2">Billing Management</h2>
        <p className="text-sm text-gray-600">
          Track billing cycles, CPT codes, and revenue optimization across your patient population.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Billing Table */}
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#1E4D36]">Patient Billing Status</CardTitle>
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-4">
                {filterTabs.map((tab) => (
                  <Button
                    key={tab.key}
                    variant={activeFilter === tab.key ? 'default' : 'outline'}
                    size="sm"
                    className={`${
                      activeFilter === tab.key 
                        ? 'bg-[#1E4D36] hover:bg-[#2A6349] text-white' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFilter(tab.key as any)}
                  >
                    {tab.label}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {tab.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-medium">Patient</TableHead>
                      <TableHead className="text-xs font-medium">CPT Code</TableHead>
                      <TableHead className="text-xs font-medium">Progress</TableHead>
                      <TableHead className="text-xs font-medium">Amount</TableHead>
                      <TableHead className="text-xs font-medium">Status</TableHead>
                      <TableHead className="text-xs font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{patient.name}</p>
                            <p className="text-xs text-gray-500">ID: {patient.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{patient.cptCode}</p>
                            <p className="text-xs text-gray-500">{patient.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{patient.minutesUsed}/{patient.minutesTotal} min</span>
                              <span>{Math.round((patient.minutesUsed / patient.minutesTotal) * 100)}%</span>
                            </div>
                            <Progress 
                              value={(patient.minutesUsed / patient.minutesTotal) * 100} 
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{patient.amount}</TableCell>
                        <TableCell>{getStatusBadge(patient.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <FileText className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* At-Risk Patients Sidebar */}
        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Top At-Risk Patients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {atRiskPatients.map((patient) => (
                <Card key={patient.id} className="border border-orange-200 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.cptCode}</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                        {patient.daysLeft}d left
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{patient.progress}%</span>
                      </div>
                      <Progress 
                        value={patient.progress} 
                        className="h-2"
                      />
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-medium text-[#1E4D36]">{patient.amount}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" className="h-6 px-2 bg-[#1E4D36] hover:bg-[#2A6349] text-xs">
                            Bill
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-3 text-[#1E4D36] border-[#1E4D36] hover:bg-[#EBF4F0]"
              >
                View All At-Risk
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
