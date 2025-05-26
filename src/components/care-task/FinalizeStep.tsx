
import React from 'react';
import { Check, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FinalizeStepProps {
  task: any;
  timer: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onFinalize: () => void;
  formatTime: (seconds: number) => string;
}

export const FinalizeStep: React.FC<FinalizeStepProps> = ({
  task,
  timer,
  isTimerRunning,
  onToggleTimer,
  onFinalize,
  formatTime
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Check className="mr-2 text-green-500" size={20} />
          Finalize and Bill
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Time Spent:</h3>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-blue-100 text-blue-800 font-mono text-lg py-1 px-3">
              {formatTime(timer)}
            </Badge>
            <span className="text-gray-600">minutes</span>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={onToggleTimer}
            >
              {isTimerRunning ? (
                <><Pause size={14} className="mr-1" /> Pause</>
              ) : (
                <><Play size={14} className="mr-1" /> Resume</>
              )}
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-mono">
                  {task.cptCode}
                </Badge>
                <span className="text-sm text-gray-600">{task.cptDescription}</span>
              </div>
              <span className="font-medium">{formatTime(timer)}/20 min</span>
            </div>
            <Progress value={(timer / (20 * 60)) * 100} className="h-2" />
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700" 
            onClick={onFinalize}
          >
            <Check className="mr-2" size={16} />
            Complete and Add to Billing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
