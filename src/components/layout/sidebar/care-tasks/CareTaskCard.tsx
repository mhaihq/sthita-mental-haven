
import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CareTask } from './types';

interface CareTaskCardProps {
  task: CareTask;
  onClick: () => void;
}

export const CareTaskCard: React.FC<CareTaskCardProps> = ({ task, onClick }) => (
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
