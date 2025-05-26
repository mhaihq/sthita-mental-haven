
import React from 'react';
import { AlertTriangle, Play, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EvidenceCard } from './EvidenceCard';

interface RiskAssessmentStepProps {
  task: any;
  riskApproved: boolean | null;
  onRiskDecision: (approved: boolean) => void;
  onShowAudio: () => void;
  evidenceStatuses: Record<string, 'pending' | 'saved' | 'rejected'>;
  onEvidenceAction: (evidenceIndex: number, action: 'save' | 'reject') => void;
}

export const RiskAssessmentStep: React.FC<RiskAssessmentStepProps> = ({
  task,
  riskApproved,
  onRiskDecision,
  onShowAudio,
  evidenceStatuses,
  onEvidenceAction
}) => {
  const savedEvidenceCount = Object.values(evidenceStatuses).filter(status => status === 'saved').length;
  const totalEvidenceCount = task.evidenceFromCall.length;
  const allEvidenceReviewed = Object.keys(evidenceStatuses).length === totalEvidenceCount;

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
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Evidence from patient call:</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {savedEvidenceCount}/{totalEvidenceCount} Evidence Reviewed
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onShowAudio}
              >
                <Play size={16} className="mr-1" /> Full Audio & Transcript
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {task.evidenceFromCall.map((evidence: any, index: number) => (
              <EvidenceCard
                key={index}
                evidence={{
                  ...evidence,
                  audioUrl: `#audio-${index}`, // Mock URL - would be real in production
                  duration: 25 + Math.random() * 10 // Random duration between 25-35 seconds
                }}
                status={evidenceStatuses[index] || 'pending'}
                onSaveToLog={() => onEvidenceAction(index, 'save')}
                onReject={() => onEvidenceAction(index, 'reject')}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <h3 className="font-medium">CPT Code:</h3>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-mono">
            {task.cptCode}
          </Badge>
          <span className="text-sm text-gray-600">{task.cptDescription}</span>
        </div>
        
        {/* Risk Decision Section */}
        {allEvidenceReviewed && savedEvidenceCount > 0 && riskApproved === null ? (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Evidence Review Complete</h4>
            <p className="text-sm text-gray-600 mb-3">
              {savedEvidenceCount} piece(s) of evidence saved to log. Ready for risk assessment decision.
            </p>
            <div className="flex gap-3">
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
          </div>
        ) : allEvidenceReviewed && savedEvidenceCount === 0 ? (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h4 className="font-medium mb-2">No Evidence Approved</h4>
            <p className="text-sm text-gray-600 mb-3">
              All evidence has been rejected. Consider denying the risk assessment.
            </p>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 w-full"
              onClick={() => onRiskDecision(false)}
            >
              <X size={16} className="mr-2" /> Deny Risk
            </Button>
          </div>
        ) : !allEvidenceReviewed ? (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Please review all evidence pieces before making a risk assessment decision.
            </p>
          </div>
        ) : null}

        {riskApproved !== null && (
          <div className={`p-3 rounded-md flex items-center gap-2 ${
            riskApproved 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {riskApproved ? (
              <>
                <Check size={16} className="text-green-600" />
                Risk assessment approved ({savedEvidenceCount} evidence pieces saved)
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
