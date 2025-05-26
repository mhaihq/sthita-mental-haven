
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface CarePlanStepProps {
  task: any;
  selectedActions: string[];
  manualAction: string;
  summary: string;
  onActionToggle: (actionId: string, checked: boolean) => void;
  onManualActionChange: (value: string) => void;
  onAddManualAction: () => void;
  onSummaryChange: (value: string) => void;
}

export const CarePlanStep: React.FC<CarePlanStepProps> = ({
  task,
  selectedActions,
  manualAction,
  summary,
  onActionToggle,
  onManualActionChange,
  onAddManualAction,
  onSummaryChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 text-blue-500" size={20} />
          Care Plan Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-medium">AI Suggested Actions:</h3>
          {task.suggestedActions.map((action: any) => (
            <div key={action.id} className="flex items-center space-x-2">
              <Checkbox 
                id={action.id} 
                checked={selectedActions.includes(action.id)}
                onCheckedChange={(checked) => 
                  onActionToggle(action.id, checked === true)
                }
              />
              <label
                htmlFor={action.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {action.text}
              </label>
            </div>
          ))}
        </div>
        
        <div className="pt-2">
          <h3 className="font-medium mb-2">Add Custom Action:</h3>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter custom action..."
              value={manualAction}
              onChange={(e) => onManualActionChange(e.target.value)}
            />
            <Button 
              onClick={onAddManualAction}
              disabled={!manualAction.trim()}
            >
              Add
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">Care Plan Summary:</h3>
          <Textarea 
            className="min-h-[120px]"
            value={summary}
            onChange={(e) => onSummaryChange(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-2">
            This summary will be added to billing documents.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
