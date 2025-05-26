
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, ArrowRight } from 'lucide-react';
import { populationTasksData, PopulationTask } from '@/data/populationTasksData';

const TaskCard: React.FC<{ task: PopulationTask }> = ({ task }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium text-[#1E4D36]">
            {task.title}
          </CardTitle>
          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <User size={12} />
            <span>{task.patientName}</span>
          </div>
          <p className="text-xs text-gray-700 line-clamp-2">{task.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} />
              <span>{task.estimatedTime}</span>
            </div>
            <Button size="sm" className="h-6 px-2 text-xs bg-[#1E4D36] hover:bg-[#2A6349]">
              <ArrowRight size={12} className="mr-1" />
              Take Action
            </Button>
          </div>
          {task.assignedTo && (
            <p className="text-xs text-blue-600">Assigned to: {task.assignedTo}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TaskColumn: React.FC<{ title: string; tasks: PopulationTask[]; count: number }> = ({ title, tasks, count }) => (
  <div className="flex-1 min-w-0">
    <div className="bg-gray-50 p-3 rounded-t-lg border-b">
      <h3 className="font-medium text-sm text-[#1E4D36] flex items-center justify-between">
        {title}
        <Badge variant="secondary" className="text-xs">{count}</Badge>
      </h3>
    </div>
    <div className="p-3 max-h-96 overflow-y-auto medical-scrollbar">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <p className="text-xs text-gray-500 text-center py-4">No tasks</p>
      )}
    </div>
  </div>
);

export const TaskQueueContent: React.FC = () => {
  const needsReviewTasks = populationTasksData.filter(task => task.status === 'needs-review');
  const inProgressTasks = populationTasksData.filter(task => task.status === 'in-progress');
  const needsQhpTasks = populationTasksData.filter(task => task.status === 'needs-qhp');
  const completedTasks = populationTasksData.filter(task => task.status === 'completed');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1E4D36]">Population Task Queue</h2>
        <Badge variant="outline" className="text-xs">
          {populationTasksData.length} Total Tasks
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <TaskColumn 
          title="Needs Review" 
          tasks={needsReviewTasks} 
          count={needsReviewTasks.length}
        />
        <TaskColumn 
          title="In Progress" 
          tasks={inProgressTasks} 
          count={inProgressTasks.length}
        />
        <TaskColumn 
          title="Needs QHP" 
          tasks={needsQhpTasks} 
          count={needsQhpTasks.length}
        />
        <TaskColumn 
          title="Completed" 
          tasks={completedTasks} 
          count={completedTasks.length}
        />
      </div>
    </div>
  );
};
