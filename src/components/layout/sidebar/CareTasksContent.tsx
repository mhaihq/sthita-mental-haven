
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

export const CareTasksContent: React.FC = () => {
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    // Navigate to the task detail page
    navigate(`/care-task/${taskId}`);
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
      <MonthlyRequirements 
        cptCodeInfo={cptCodeInfo}
        completedMinutes={completedMinutes}
        totalRequiredMinutes={totalRequiredMinutes}
      />
      
      {/* 99484 - BHI Tasks */}
      <CareTasksGroup
        cptCode="99484"
        title="Behavioral Health Tasks"
        tasks={careTasksData['99484']}
        onTaskClick={handleTaskClick}
      />
      
      {/* 99490 - CCM Tasks */}
      <CareTasksGroup
        cptCode="99490"
        title="Chronic Care Management Tasks"
        tasks={careTasksData['99490']}
        onTaskClick={handleTaskClick}
      />
    </div>
  );
};
