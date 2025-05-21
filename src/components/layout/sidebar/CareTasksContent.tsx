
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CareTasksGroup } from './care-tasks/CareTasksGroup';
import { MonthlyRequirements } from './care-tasks/MonthlyRequirements';
import { 
  cptCodeInfo, 
  careTasksData, 
  totalRequiredMinutes, 
  completedMinutes 
} from './care-tasks/careTasksData';

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
      
      {/* Top section - Time tracking */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <MonthlyRequirements 
            cptCodeInfo={filteredCptCodeInfo}
            completedMinutes={filteredCompletedMinutes}
            totalRequiredMinutes={filteredTotalRequiredMinutes}
          />
        </CardContent>
      </Card>
      
      {/* Sidebar section - Tasks */}
      <div className="space-y-4">
        {/* PHQ-9 Tasks */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-md font-medium mb-3">PHQ-9 Assessment</h4>
            <p className="text-sm text-gray-600 mb-2">Patient Health Questionnaire</p>
            <Button size="sm" variant="default" className="bg-[#1E4D36] hover:bg-[#2A6349] w-full">
              Complete Assessment
            </Button>
          </CardContent>
        </Card>
        
        {/* BHI Tasks */}
        <CareTasksGroup
          cptCode={bhiCode}
          title="Behavioral Health Tasks"
          tasks={careTasksData[bhiCode]}
          onTaskClick={handleTaskClick}
        />
      </div>
    </div>
  );
};
