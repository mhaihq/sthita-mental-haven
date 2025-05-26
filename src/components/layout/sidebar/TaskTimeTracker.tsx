
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { careTasksData } from './care-tasks/careTasksData';

interface TaskTimeTrackerProps {
  taskId: string;
  onBack: () => void;
}

export const TaskTimeTracker: React.FC<TaskTimeTrackerProps> = ({ taskId, onBack }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalSessionTime, setTotalSessionTime] = useState(0);

  // Find the task from careTasksData
  const allTasks = [...careTasksData.ccm, ...careTasksData.rpm];
  const task = allTasks.find(t => t.id === taskId);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (isTracking) {
      setTotalSessionTime(prev => prev + elapsedTime);
      setElapsedTime(0);
    }
    setIsTracking(!isTracking);
  };

  const handleCompleteTask = () => {
    if (isTracking) {
      setTotalSessionTime(prev => prev + elapsedTime);
      setIsTracking(false);
    }
    // Here you would typically save the time to your backend
    console.log(`Task ${taskId} completed with ${totalSessionTime + elapsedTime} seconds`);
    onBack();
  };

  if (!task) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </Button>
        <p>Task not found</p>
      </div>
    );
  }

  const currentSessionMinutes = Math.floor((totalSessionTime + elapsedTime) / 60);
  const progressPercentage = Math.min((currentSessionMinutes / task.minutes) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full bg-${task.categoryColor}-300`}></div>
            <Badge className={`bg-${task.categoryColor}-50 text-${task.categoryColor}-800 border border-${task.categoryColor}-200`}>
              {task.category}
            </Badge>
          </div>
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <p className="text-sm text-gray-600">{task.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Time Tracking Display */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-mono font-bold text-[#1E4D36] mb-2">
              {formatTime(elapsedTime)}
            </div>
            <p className="text-sm text-gray-600">Current Session</p>
            
            {totalSessionTime > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-600">
                  Total Today: {formatTime(totalSessionTime + elapsedTime)}
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Task Progress</span>
              <span>{currentSessionMinutes}/{task.minutes} min</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleStartStop}
              className={`flex-1 ${isTracking ? 'bg-red-600 hover:bg-red-700' : 'bg-[#1E4D36] hover:bg-[#2A6349]'}`}
            >
              {isTracking ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleCompleteTask}
              variant="outline"
              className="flex-1"
              disabled={totalSessionTime + elapsedTime === 0}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete
            </Button>
          </div>

          {/* Task Insight */}
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-2">
              AI Insight
            </Badge>
            <p className="text-sm text-gray-600">{task.insight}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
