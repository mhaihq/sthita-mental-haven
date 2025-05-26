
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle,
  Phone,
  FileText,
  ChevronDown,
  Calendar,
  ClipboardX,
  MessageCircleX
} from 'lucide-react';

export const BillingContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ready' | 'at-risk'>('ready');
  const [isOtherFiltersOpen, setIsOtherFiltersOpen] = useState(false);

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

  const readyToBillPatients = [
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
    }
  ];

  const atRiskPatients = [
    {
      id: 'P003',
      name: 'Emma Davis',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 45,
      minutesTotal: 70,
      amount: '$220.00',
      status: 'at-risk',
      daysRemaining: 3,
      riskFactors: ['Expires in 3 days', 'Missing care plan']
    },
    {
      id: 'P004',
      name: 'James Wilson',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 8,
      minutesTotal: 20,
      amount: '$180.00',
      status: 'at-risk',
      daysRemaining: 5,
      riskFactors: ['Not contacted in 14 days']
    },
    {
      id: 'P005',
      name: 'Lisa Anderson',
      cptCode: '99492',
      description: 'First Month CoCM',
      minutesUsed: 55,
      minutesTotal: 70,
      amount: '$195.00',
      status: 'at-risk',
      daysRemaining: 2,
      riskFactors: ['Expires in 2 days', 'Missing documentation']
    }
  ];

  const otherFilterPatients = [
    {
      id: 'P006',
      name: 'Robert Kim',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 5,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'under-minutes',
      daysRemaining: 10
    },
    {
      id: 'P007',
      name: 'Maria Garcia',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 0,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'blocked',
      daysRemaining: 0
    }
  ];

  const getCurrentPatients = () => {
    switch (activeFilter) {
      case 'ready':
        return readyToBillPatients;
      case 'at-risk':
        return atRiskPatients;
      default:
        return [];
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Ready</Badge>;
      case 'at-risk':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">At Risk</Badge>;
      case 'under-minutes':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Under Minutes</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Pending</Badge>;
    }
  };

  const getRiskFactorIcon = (factor: string) => {
    if (factor.includes('Expires') || factor.includes('days')) {
      return <Calendar className="h-3 w-3 text-orange-500" />;
    }
    if (factor.includes('Missing') || factor.includes('care plan') || factor.includes('documentation')) {
      return <ClipboardX className="h-3 w-3 text-red-500" />;
    }
    if (factor.includes('contacted')) {
      return <MessageCircleX className="h-3 w-3 text-blue-500" />;
    }
    return <AlertTriangle className="h-3 w-3 text-orange-500" />;
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

      {/* Main Billing Table */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-[#1E4D36]">Patient Billing Status</CardTitle>
          
          {/* Primary Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={activeFilter === 'ready' ? 'default' : 'outline'}
              size="sm"
              className={`${
                activeFilter === 'ready' 
                  ? 'bg-[#1E4D36] hover:bg-[#2A6349] text-white' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setActiveFilter('ready')}
            >
              Ready to Bill
              <Badge variant="secondary" className="ml-2 text-xs">
                {readyToBillPatients.length}
              </Badge>
            </Button>
            
            <Button
              variant={activeFilter === 'at-risk' ? 'default' : 'outline'}
              size="sm"
              className={`${
                activeFilter === 'at-risk' 
                  ? 'bg-[#1E4D36] hover:bg-[#2A6349] text-white' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setActiveFilter('at-risk')}
            >
              At Risk
              <Badge variant="secondary" className="ml-2 text-xs">
                {atRiskPatients.length}
              </Badge>
            </Button>
          </div>

          {/* Expandable Other Filters */}
          <Collapsible open={isOtherFiltersOpen} onOpenChange={setIsOtherFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-gray-200 hover:bg-gray-50"
              >
                Other Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOtherFiltersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                  Under Minutes
                  <Badge variant="secondary" className="ml-2 text-xs">8</Badge>
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                  Blocked
                  <Badge variant="secondary" className="ml-2 text-xs">3</Badge>
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
                  {activeFilter === 'at-risk' && (
                    <TableHead className="text-xs font-medium">Risk Factors</TableHead>
                  )}
                  <TableHead className="text-xs font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPatients().map((patient) => (
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
                    {activeFilter === 'at-risk' && (
                      <TableCell>
                        <div className="space-y-1">
                          {patient.riskFactors?.map((factor, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs">
                              {getRiskFactorIcon(factor)}
                              <span className="text-gray-600">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <FileText className="h-3 w-3" />
                        </Button>
                        {activeFilter === 'ready' && (
                          <Button size="sm" className="h-7 px-2 bg-[#1E4D36] hover:bg-[#2A6349] text-xs">
                            Bill
                          </Button>
                        )}
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
  );
};
