
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CareTasksGroup } from './care-tasks/CareTasksGroup';
import { MonthlyRequirements } from './care-tasks/MonthlyRequirements';
import { 
  cptCodeInfo, 
  careTasksData, 
  totalRequiredMinutes, 
  completedMinutes 
} from './care-tasks/careTasksData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const CareTasksContent: React.FC = () => {
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    // Navigate to the task detail page
    navigate(`/care-task/${taskId}`);
  };
  
  // Filter to only show the BHI data
  const bhiCode = '99484';
  const filteredCptCodeInfo = { [bhiCode]: cptCodeInfo[bhiCode] };
  const filteredCompletedMinutes = { [bhiCode]: completedMinutes[bhiCode] };
  const filteredTotalRequiredMinutes = { [bhiCode]: totalRequiredMinutes[bhiCode] };
  
  // Calculate progress percentage for the time tracking card
  const completedMins = filteredCompletedMinutes[bhiCode] || 0;
  const totalMins = filteredTotalRequiredMinutes[bhiCode] || 1; // Prevent division by zero
  const progressPercentage = Math.min(Math.round((completedMins / totalMins) * 100), 100);
  
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
      
      {/* Time Tracking and Task Info Cards at the top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Time Tracking Card */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{bhiCode}: {filteredCptCodeInfo[bhiCode]?.description || 'Behavioral Health Integration'}</span>
                  <span>{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{completedMins} min</span>
                  <span>{totalMins} min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Task Information Card */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Task Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Total Tasks</dt>
                <dd className="font-medium">
                  {careTasksData[bhiCode]?.length || 0} tasks
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Category</dt>
                <dd>
                  <Badge className="bg-pink-100 text-pink-700">
                    Mental Health
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Priority</dt>
                <dd>
                  <Badge className="bg-red-100 text-red-700">
                    Urgent
                  </Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Requirements */}
      <MonthlyRequirements 
        cptCodeInfo={filteredCptCodeInfo}
        completedMinutes={filteredCompletedMinutes}
        totalRequiredMinutes={filteredTotalRequiredMinutes}
      />
      
      {/* 99484 - BHI Tasks */}
      <CareTasksGroup
        cptCode={bhiCode}
        title="Behavioral Health Tasks"
        tasks={careTasksData[bhiCode]}
        onTaskClick={handleTaskClick}
      />
    </div>
  );
};
