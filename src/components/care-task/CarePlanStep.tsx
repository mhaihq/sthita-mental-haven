
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  soapNote: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  onSoapNoteChange: (section: string, value: string) => void;
}

export const CarePlanStep: React.FC<CarePlanStepProps> = ({
  task,
  soapNote,
  onSoapNoteChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 text-blue-500" size={20} />
          SOAP Note
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 text-blue-600">Subjective</h3>
          <p className="text-sm text-gray-600 mb-2">Patient's reported symptoms, feelings, and concerns</p>
          <Textarea 
            className="min-h-[100px]"
            placeholder="Document what the patient reported during the call..."
            value={soapNote.subjective}
            onChange={(e) => onSoapNoteChange('subjective', e.target.value)}
          />
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2 text-green-600">Objective</h3>
          <p className="text-sm text-gray-600 mb-2">Observable, measurable findings and data</p>
          <Textarea 
            className="min-h-[100px]"
            placeholder="Record objective findings, measurements, and observations..."
            value={soapNote.objective}
            onChange={(e) => onSoapNoteChange('objective', e.target.value)}
          />
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2 text-orange-600">Assessment</h3>
          <p className="text-sm text-gray-600 mb-2">Clinical judgment and diagnosis</p>
          <Textarea 
            className="min-h-[100px]"
            placeholder="Provide clinical assessment and diagnosis..."
            value={soapNote.assessment}
            onChange={(e) => onSoapNoteChange('assessment', e.target.value)}
          />
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2 text-purple-600">Plan</h3>
          <p className="text-sm text-gray-600 mb-2">Treatment plan and next steps</p>
          <Textarea 
            className="min-h-[120px]"
            placeholder="Outline treatment plan, interventions, and follow-up..."
            value={soapNote.plan}
            onChange={(e) => onSoapNoteChange('plan', e.target.value)}
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            This SOAP note will be added to the patient's medical record and used for billing documentation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
