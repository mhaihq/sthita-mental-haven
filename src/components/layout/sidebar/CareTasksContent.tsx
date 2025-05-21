
import React from 'react';
import { AlertTriangle, Clock, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

// CPT code data with descriptions
const cptCodeInfo = {
  '99490': {
    description: 'Chronic Care Management',
    requirements: '2+ chronic conditions, 20 min/month',
    rateInfo: 'Medicare: ~$42/month'
  },
  '99484': {
    description: 'Behavioral Health Integration',
    requirements: 'Mental/behavioral condition, 20 min/month',
    rateInfo: 'Medicare: ~$48/month'
  }
};

// Task data grouped by CPT codes
const careTasksData = {
  '99490': [
    {
      id: 'T-1002',
      title: 'Missed Medications This Week',
      description: '2 doses of Lisinopril missed (Apr 3-4)',
      category: 'Medication',
      categoryColor: 'yellow',
      minutes: 5,
      insight: 'Flagged by Adherence Agent — 11% drop in last 30 days',
      status: 'assigned'
    },
    {
      id: 'T-1004', 
      title: 'Blood Pressure Follow-up',
      description: 'BP reading 138/88 on Apr 5',
      category: 'Vitals',
      categoryColor: 'blue',
      minutes: 5,
      insight: 'Mild elevation from baseline (120/80)',
      status: 'pending'
    },
    {
      id: 'T-1005',
      title: 'Social Determinants Assessment',
      description: 'Quarterly SDOH check-in',
      category: 'Assessment',
      categoryColor: 'green',
      minutes: 10,
      insight: 'Previously flagged transportation issues',
      status: 'pending'
    }
  ],
  '99484': [
    {
      id: 'T-1001',
      title: 'PHQ-9 Score Increased',
      description: 'Score increased from 8 to 13',
      category: 'Mental-health',
      categoryColor: 'pink',
      minutes: 10,
      insight: 'Flagged by AI from Apr 3 call — mentions job stress',
      status: 'urgent'
    },
    {
      id: 'T-1003',
      title: 'Sleep Pattern Changes',
      description: 'Reported difficulty staying asleep',
      category: 'Mental-health',
      categoryColor: 'purple',
      minutes: 5,
      insight: 'Mentioned in last AI call, possible side effect',
      status: 'assigned'
    }
  ]
};

interface CareTaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    minutes: number;
    insight: string;
    status: string;
  };
  onClick: () => void;
}

const CareTaskCard: React.FC<CareTaskCardProps> = ({ task, onClick }) => (
  <Card className="bg-white rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full bg-${task.categoryColor}-300`}></div>
        <Badge className={`bg-${task.categoryColor}-50 text-${task.categoryColor}-800 border border-${task.categoryColor}-200 hover:bg-${task.categoryColor}-100`}>
          {task.category}
        </Badge>
        {task.status === 'urgent' && (
          <Badge className="ml-auto bg-red-50 text-red-600 border border-red-200">
            Urgent
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {task.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        {task.description}
      </p>
      
      <div className="mb-3">
        <Badge className="bg-purple-50 text-purple-700 border-purple-200">
          AI Insight
        </Badge>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {task.insight}
        </p>
      </div>
      
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          {task.minutes} min
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600">
          Details <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const CareTasksContent: React.FC = () => {
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    // Navigate to the task detail page
    navigate(`/care-task/${taskId}`);
  };

  const totalRequiredMinutes = {
    '99490': 20,
    '99484': 20
  };

  const completedMinutes = {
    '99490': 6,
    '99484': 4
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-xl text-gray-900 flex items-center">
          <AlertTriangle className="mr-2 text-amber-500" size={20} />
          Care Tasks
        </h3>
        <Button variant="outline" size="sm" className="text-blue-600">
          View All
        </Button>
      </div>
      
      {/* CCM Progress Tracking Card */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-lg">Monthly Requirements</h4>
            <Badge className="bg-blue-50 text-blue-600 border-blue-100">
              April 2025
            </Badge>
          </div>
          
          <div className="space-y-4">
            {/* 99490 - CCM */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-mono">
                      99490
                    </Badge>
                    <h5 className="font-medium">Chronic Care Management</h5>
                  </div>
                  <p className="text-xs text-gray-600">Required: 20 min/month</p>
                </div>
                <p className="font-medium">
                  {completedMinutes['99490']}/{totalRequiredMinutes['99490']} min
                </p>
              </div>
              
              <div className="mt-2">
                <Progress value={(completedMinutes['99490']/totalRequiredMinutes['99490'])*100} className="h-2" />
              </div>
              
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>{cptCodeInfo['99490'].rateInfo}</span>
                <span>
                  {totalRequiredMinutes['99490'] - completedMinutes['99490']} min remaining
                </span>
              </div>
            </div>
            
            {/* 99484 - BHI */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-50 text-purple-600 border-purple-100 font-mono">
                      99484
                    </Badge>
                    <h5 className="font-medium">Behavioral Health</h5>
                  </div>
                  <p className="text-xs text-gray-600">Required: 20 min/month</p>
                </div>
                <p className="font-medium">
                  {completedMinutes['99484']}/{totalRequiredMinutes['99484']} min
                </p>
              </div>
              
              <div className="mt-2">
                <Progress value={(completedMinutes['99484']/totalRequiredMinutes['99484'])*100} className="h-2" />
              </div>
              
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>{cptCodeInfo['99484'].rateInfo}</span>
                <span>
                  {totalRequiredMinutes['99484'] - completedMinutes['99484']} min remaining
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 99484 - BHI Tasks */}
      <div>
        <h4 className="font-medium text-lg text-gray-900 mb-3 flex items-center">
          <Badge className="bg-purple-50 text-purple-700 border-purple-100 mr-2 font-mono">
            99484
          </Badge>
          Behavioral Health Tasks
        </h4>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          {careTasksData['99484'].map(task => (
            <CareTaskCard 
              key={task.id} 
              task={task}
              onClick={() => handleTaskClick(task.id)}
            />
          ))}
        </div>
      </div>
      
      {/* 99490 - CCM Tasks */}
      <div>
        <h4 className="font-medium text-lg text-gray-900 mb-3 flex items-center">
          <Badge className="bg-blue-50 text-blue-700 border-blue-100 mr-2 font-mono">
            99490
          </Badge>
          Chronic Care Management Tasks
        </h4>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          {careTasksData['99490'].map(task => (
            <CareTaskCard 
              key={task.id} 
              task={task}
              onClick={() => handleTaskClick(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
