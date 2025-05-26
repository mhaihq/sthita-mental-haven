
import React from 'react';
import { AlertTriangle, Play, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RiskAssessmentStepProps {
  task: any;
  riskApproved: boolean | null;
  onRiskDecision: (approved: boolean) => void;
  onShowAudio: () => void;
}

export const RiskAssessmentStep: React.FC<RiskAssessmentStepProps> = ({
  task,
  riskApproved,
  onRiskDecision,
  onShowAudio
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 text-amber-500" size={20} />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Why this was flagged:</h3>
          <p className="text-gray-600">{task.flagReason}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Evidence from patient call:</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onShowAudio}
            >
              <Play size={16} className="mr-1" /> Audio & Transcript
            </Button>
          </div>
          
          <ul className="space-y-2">
            {task.evidenceFromCall.map((evidence: any, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <Badge variant="outline" className="mt-1 shrink-0">
                  {evidence.timestamp}
                </Badge>
                <span className="text-gray-700">"{evidence.text}"</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center gap-3">
          <h3 className="font-medium">CPT Code:</h3>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-mono">
            {task.cptCode}
          </Badge>
          <span className="text-sm text-gray-600">{task.cptDescription}</span>
        </div>
        
        {riskApproved === null ? (
          <div className="flex gap-3 mt-4">
            <Button 
              className="bg-green-600 hover:bg-green-700 flex-1"
              onClick={() => onRiskDecision(true)}
            >
              <Check size={16} className="mr-2" /> Approve Risk
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 flex-1"
              onClick={() => onRiskDecision(false)}
            >
              <X size={16} className="mr-2" /> Deny Risk
            </Button>
          </div>
        ) : (
          <div className={`p-3 rounded-md flex items-center gap-2 ${
            riskApproved 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {riskApproved ? (
              <>
                <Check size={16} className="text-green-600" />
                Risk assessment approved
              </>
            ) : (
              <>
                <X size={16} className="text-red-600" />
                Risk assessment denied
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
