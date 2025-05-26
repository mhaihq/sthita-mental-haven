
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, Clock, ArrowLeft, Play, Pause
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { StepProgress } from '@/components/ui/step-progress';
import { RiskAssessmentStep } from '@/components/care-task/RiskAssessmentStep';
import { CarePlanStep } from '@/components/care-task/CarePlanStep';
import { FollowUpStep } from '@/components/care-task/FollowUpStep';
import { FinalizeStep } from '@/components/care-task/FinalizeStep';
import { populationTasksData } from '@/data/populationTasksData';

const STEPS = ['Risk Assessment', 'Care Plan', 'Follow-up', 'Finalize'];

// Map population task to care task format
const mapPopulationTaskToCareTask = (popTask: any) => ({
  id: popTask.id,
  title: popTask.title,
  description: popTask.description,
  category: popTask.taskType,
  categoryColor: popTask.priority === 'High' ? 'red' : popTask.priority === 'Medium' ? 'yellow' : 'green',
  minutes: parseInt(popTask.estimatedTime),
  insight: `Flagged by ${popTask.triggeredBy} from ${popTask.callDate} call`,
  status: popTask.status === 'needs-review' ? 'urgent' : 'assigned',
  cptCode: '99484',
  cptDescription: 'Behavioral Health Integration',
  flagReason: popTask.description,
  evidenceFromCall: [
    {
      text: `Patient mentioned: ${popTask.description}`,
      timestamp: "2:34",
      importance: "high"
    }
  ],
  audioUrl: "#",
  transcript: `AI: How have you been feeling lately?\nPatient: ${popTask.description}`,
  suggestedActions: [
    { id: 'action-1', text: 'Schedule follow-up call', default: true },
    { id: 'action-2', text: 'Review current treatment plan', default: true },
    { id: 'action-3', text: 'Update care team', default: false }
  ]
});

const TimeTracking = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [task, setTask] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioDialog, setShowAudioDialog] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [manualAction, setManualAction] = useState("");
  const [summary, setSummary] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [riskApproved, setRiskApproved] = useState<boolean | null>(null);
  const [evidenceStatuses, setEvidenceStatuses] = useState<Record<string, 'pending' | 'saved' | 'rejected'>>({});
  const [soapNote, setSoapNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  // Find and map population task to care task format
  useEffect(() => {
    if (taskId) {
      const popTask = populationTasksData.find(t => t.id === taskId);
      if (popTask) {
        const mappedTask = mapPopulationTaskToCareTask(popTask);
        setTask(mappedTask);
        
        // Set initial selected actions
        const initialSelectedActions = mappedTask.suggestedActions
          .filter(action => action.default)
          .map(action => action.id);
        
        setSelectedActions(initialSelectedActions);
        
        // Generate initial SOAP note
        setSoapNote({
          subjective: `Patient reports: ${popTask.description}`,
          objective: `Task flagged by ${popTask.triggeredBy}. Patient: ${popTask.patientName} (ID: ${popTask.patientId})`,
          assessment: `${popTask.title} - Priority: ${popTask.priority}`,
          plan: 'Address identified concern and implement appropriate interventions.'
        });
        
        // Generate initial summary
        setSummary(`Addressing ${popTask.title} for patient ${popTask.patientName}. Implementing recommended interventions.`);
      }
    }
    setIsLoading(false);
  }, [taskId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Format time function
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  // Evidence handling functions
  const handleEvidenceAction = (evidenceIndex: number, action: 'save' | 'reject') => {
    setEvidenceStatuses(prev => ({
      ...prev,
      [evidenceIndex]: action === 'save' ? 'saved' : 'rejected'
    }));

    toast({
      title: action === 'save' ? "Evidence Saved" : "Evidence Rejected",
      description: `Evidence piece ${evidenceIndex + 1} has been ${action === 'save' ? 'saved to log' : 'rejected'}.`,
      variant: action === 'save' ? "default" : "destructive"
    });
  };

  // SOAP note handler
  const handleSoapNoteChange = (section: string, value: string) => {
    setSoapNote(prev => ({
      ...prev,
      [section]: value
    }));
  };

  // Risk assessment handlers
  const handleRiskApproval = (approved: boolean) => {
    setRiskApproved(approved);
    const savedCount = Object.values(evidenceStatuses).filter(status => status === 'saved').length;
    
    toast({
      title: approved ? "Risk Approved" : "Risk Denied",
      description: approved 
        ? `The risk assessment has been approved with ${savedCount} evidence pieces.` 
        : "The risk assessment has been marked as not applicable.",
      variant: approved ? "default" : "destructive"
    });

    if (approved) {
      setTimeout(() => {
        nextStep();
      }, 1000);
    }
  };

  // Care plan handlers
  const handleActionToggle = (actionId: string, checked: boolean) => {
    if (checked) {
      setSelectedActions(prev => [...prev, actionId]);
    } else {
      setSelectedActions(prev => prev.filter(id => id !== actionId));
    }
  };

  const handleAddManualAction = () => {
    if (manualAction.trim()) {
      setSummary(prev => prev + ` Added custom plan: ${manualAction}.`);
      setManualAction("");
      toast({
        title: "Custom Action Added",
        description: "Your custom action has been added to the plan."
      });
    }
  };

  // Handle finalizing the task
  const handleFinalize = () => {
    toast({
      title: "Care Task Completed",
      description: `Time logged: ${formatTime(timer)} minutes for ${task?.cptCode} billing code.`,
    });
    
    setTimeout(() => {
      navigate('/?tab=taskQueue'); // Return to task queue
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading task...</div>;
  }

  if (!task) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={() => navigate('/?tab=taskQueue')}>
            <ArrowLeft className="mr-2" size={16} /> Back to Task Queue
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto text-amber-500" size={48} />
              <h2 className="text-2xl font-bold mt-4">Task Not Found</h2>
              <p className="text-gray-600 mt-2">The task you're looking for could not be found.</p>
              <Button className="mt-6" onClick={() => navigate('/?tab=taskQueue')}>Return to Task Queue</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => navigate('/?tab=taskQueue')}>
          <ArrowLeft className="mr-2" size={16} /> Back to Task Queue
        </Button>
        <Badge className={`bg-${task.categoryColor}-100 text-${task.categoryColor}-800 border-${task.categoryColor}-200`}>
          {task.category}
        </Badge>
      </div>

      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="text-gray-600 mb-6">{task.description}</p>

      {/* Progress Bar */}
      <StepProgress 
        currentStep={currentStep}
        completedSteps={completedSteps}
        steps={STEPS}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step Content */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <RiskAssessmentStep
                task={task}
                riskApproved={riskApproved}
                onRiskDecision={handleRiskApproval}
                onShowAudio={() => setShowAudioDialog(true)}
                evidenceStatuses={evidenceStatuses}
                onEvidenceAction={handleEvidenceAction}
              />
              {riskApproved === false && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Risk assessment denied. Task workflow ended.</p>
                  <Button onClick={() => navigate('/?tab=taskQueue')}>Return to Task Queue</Button>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && riskApproved && (
            <div className="space-y-4">
              <CarePlanStep
                task={task}
                selectedActions={selectedActions}
                manualAction={manualAction}
                summary={summary}
                onActionToggle={handleActionToggle}
                onManualActionChange={setManualAction}
                onAddManualAction={handleAddManualAction}
                onSummaryChange={setSummary}
                soapNote={soapNote}
                onSoapNoteChange={handleSoapNoteChange}
              />
              <div className="flex justify-end">
                <Button onClick={nextStep}>Next: Follow-up Plan</Button>
              </div>
            </div>
          )}

          {currentStep === 3 && riskApproved && (
            <div className="space-y-4">
              <FollowUpStep />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => goToStep(2)}>Back: Care Plan</Button>
                <Button onClick={nextStep}>Next: Finalize</Button>
              </div>
            </div>
          )}

          {currentStep === 4 && riskApproved && (
            <div className="space-y-4">
              <FinalizeStep
                task={task}
                timer={timer}
                isTimerRunning={isTimerRunning}
                onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
                onFinalize={handleFinalize}
                formatTime={formatTime}
              />
              <div className="flex justify-start">
                <Button variant="outline" onClick={() => goToStep(3)}>Back: Follow-up Plan</Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-4 font-mono">
                  {formatTime(timer)}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={isTimerRunning ? "destructive" : "default"}
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? (
                      <><Pause size={16} className="mr-2" /> Pause</>
                    ) : (
                      <><Play size={16} className="mr-2" /> Resume</>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">CPT Code Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{task.cptCode}: {task.cptDescription}</span>
                      <span>{Math.round((timer / (20 * 60)) * 100)}%</span>
                    </div>
                    <Progress value={(timer / (20 * 60)) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatTime(timer)}</span>
                      <span>20:00 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Task Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Task ID</dt>
                  <dd className="font-mono text-sm">{task.id}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd>
                    <Badge className={`bg-${task.status === 'urgent' ? 'red' : 'amber'}-100 text-${task.status === 'urgent' ? 'red' : 'amber'}-600`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd>
                    <Badge className={`bg-${task.categoryColor}-100 text-${task.categoryColor}-700`}>
                      {task.category}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Expected Time</dt>
                  <dd>{task.minutes} minutes</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Current Step</dt>
                  <dd>{STEPS[currentStep - 1]}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audio & Transcript Dialog */}
      <Dialog open={showAudioDialog} onOpenChange={setShowAudioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Recording & Transcript</DialogTitle>
            <DialogDescription>
              Patient call from {new Date().toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Audio Recording:</h4>
              <div className="p-4 bg-gray-100 rounded-md flex items-center justify-center">
                <Button>
                  <Play size={16} className="mr-2" /> Play Recording
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Audio player would be implemented here in production.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Transcript:</h4>
              <div className="bg-white p-4 rounded-md border max-h-64 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">{task.transcript}</pre>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fixed timer at bottom */}
      <div className="fixed bottom-0 right-0 bg-white border rounded-tl-lg shadow-lg p-3 flex items-center gap-3">
        <div className="flex items-center">
          <Clock className="text-gray-600 mr-2" size={18} />
          <span className="text-gray-700">Time:</span>
          <span className="font-mono font-bold ml-2">{formatTime(timer)}</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsTimerRunning(!isTimerRunning)}
        >
          {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
        </Button>
      </div>
    </div>
  );
};

export default TimeTracking;
