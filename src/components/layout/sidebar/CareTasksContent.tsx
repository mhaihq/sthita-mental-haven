
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

interface CareTasksContentProps {
  onTaskDetailClick?: (taskId: string) => void;
}

export const CareTasksContent: React.FC<CareTasksContentProps> = ({ onTaskDetailClick }) => {
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
      
      {/* BHI Progress Tracking Card */}
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
        onTaskDetailClick={onTaskDetailClick}
      />
    </div>
  );
};
