
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CareTask } from './types';
import { CareTaskCard } from './CareTaskCard';

interface CareTasksGroupProps {
  cptCode: string;
  title: string;
  tasks: CareTask[];
  onTaskClick: (taskId: string) => void;
  onTaskDetailClick?: (taskId: string) => void;
}

export const CareTasksGroup: React.FC<CareTasksGroupProps> = ({ 
  cptCode, 
  title, 
  tasks, 
  onTaskClick, 
  onTaskDetailClick 
}) => {
  const badgeColor = cptCode === '99490' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-purple-50 text-purple-700 border-purple-100";
  
  return (
    <div>
      <h4 className="font-medium text-lg text-gray-900 mb-3 flex items-center">
        <Badge className={`${badgeColor} mr-2 font-mono`}>
          {cptCode}
        </Badge>
        {title}
      </h4>
      
      <div className="bg-gray-50 p-3 rounded-lg">
        {tasks.map((task) => (
          <CareTaskCard 
            key={task.id} 
            task={task}
            onClick={() => onTaskClick(task.id)}
            onDetailClick={onTaskDetailClick}
          />
        ))}
      </div>
    </div>
  );
};
