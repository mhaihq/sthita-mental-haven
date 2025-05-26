
import React from 'react';
import { ArrowUpRight } from '@/components/SidebarIcons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  statusColor: string;
  icon: React.ReactNode;
}

interface PriorityTaskItemProps {
  task: TaskItem;
  onTaskClick: () => void;
}

export const PriorityTaskItem: React.FC<PriorityTaskItemProps> = ({ task, onTaskClick }) => {
  return (
    <div 
      className="border-l-4 border-l-[#1E4D36] pl-4 pr-2 py-2 bg-white rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onTaskClick}
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2">
            {task.icon}
            <span className="font-medium text-gray-900">{task.title}</span>
            <Badge className={`bg-${task.statusColor}-100 text-${task.statusColor}-600 border-0`}>
              {task.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <p className="text-sm text-gray-600">ID: {task.id} Due: {task.dueDate}</p>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full">
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </div>
  );
};
