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

// Sample data - would come from an API or context in a real app
const careTasksData = {
  'T-1001': {
    id: 'T-1001',
    title: 'PHQ-9 Score Increased',
    description: 'Score increased from 8 to 13',
    category: 'Mental-health',
    categoryColor: 'pink',
    minutes: 10,
    insight: 'Flagged by AI from Apr 3 call — mentions job stress',
    status: 'urgent',
    cptCode: '99484',
    cptDescription: 'Behavioral Health Integration',
    flagReason: 'Patient reported increased feelings of depression and anxiety during the regular check-in call.',
    evidenceFromCall: [
      {
        text: "I'm feeling more overwhelmed than usual with work lately.",
        timestamp: "2:34",
        importance: "high"
      },
      {
        text: "Some days I just don't have the energy to get out of bed.",
        timestamp: "4:15",
        importance: "high"
      },
      {
        text: "I've been having trouble sleeping through the night.",
        timestamp: "6:22",
        importance: "medium"
      }
    ],
    audioUrl: "#", // Would be a real URL in production
    transcript: "AI: How have you been feeling lately?\nPatient: Not great, to be honest. I'm feeling more overwhelmed than usual with work lately.\nAI: I'm sorry to hear that. Can you tell me more about what's been going on?\nPatient: Work has been really stressful. Some days I just don't have the energy to get out of bed. I've been having trouble sleeping through the night too.",
    suggestedActions: [
      { id: 'action-1', text: 'Schedule call with behavioral health specialist', default: true },
      { id: 'action-2', text: 'Adjust current medication dosage (consult with doctor)', default: true },
      { id: 'action-3', text: 'Provide resources for stress management techniques', default: true },
      { id: 'action-4', text: 'Recommend sleep hygiene practices', default: false }
    ]
  },
  'T-1002': {
    id: 'T-1002',
    title: 'Missed Medications This Week',
    description: '2 doses of Lisinopril missed (Apr 3-4)',
    category: 'Medication',
    categoryColor: 'yellow',
    minutes: 5,
    insight: 'Flagged by Adherence Agent — 11% drop in last 30 days',
    status: 'assigned',
    cptCode: '99490',
    cptDescription: 'Chronic Care Management',
    flagReason: 'Patient missed 2 doses of Lisinopril (Apr 3-4), which is part of their hypertension management plan.',
    evidenceFromCall: [
      {
        text: "I forgot to take my blood pressure medication two days in a row.",
        timestamp: "1:45",
        importance: "high"
      },
      {
        text: "I've been out of my normal routine because of family visiting.",
        timestamp: "2:30",
        importance: "medium"
      }
    ],
    audioUrl: "#", // Would be a real URL in production
    transcript: "AI: How have you been with your medications this week?\nPatient: I forgot to take my blood pressure medication two days in a row.\nAI: I see. Was there a particular reason for that?\nPatient: I've been out of my normal routine because of family visiting. I usually take it with breakfast but we've been going out to eat.",
    suggestedActions: [
      { id: 'action-1', text: 'Set up medication reminder system', default: true },
      { id: 'action-2', text: 'Educate on importance of consistent Lisinopril use', default: true },
      { id: 'action-3', text: 'Create backup plan for routine disruptions', default: false }
    ]
  }
};

const STEPS = ['Risk Assessment', 'Care Plan', 'Follow-up', 'Finalize'];

const CareTaskDetail = () => {
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

  // Mock data fetching
  useEffect(() => {
    if (taskId && careTasksData[taskId as keyof typeof careTasksData]) {
      const taskData = careTasksData[taskId as keyof typeof careTasksData];
      setTask(taskData);
      
      // Set initial selected actions based on default values
      const initialSelectedActions = taskData.suggestedActions
        .filter(action => action.default)
        .map(action => action.id);
      
      setSelectedActions(initialSelectedActions);
      
      // Generate initial SOAP note based on evidence
      const evidenceText = taskData.evidenceFromCall.map(e => e.text).join('. ');
      setSoapNote({
        subjective: `Patient reports: ${evidenceText}`,
        objective: `PHQ-9 score increased from 8 to 13. Patient accessed via telehealth call on ${new Date().toLocaleDateString()}.`,
        assessment: `${taskData.title} - ${taskData.description}. ${taskData.flagReason}`,
        plan: 'Schedule follow-up call with behavioral health specialist. Review current medication regimen. Provide stress management resources. Monitor sleep patterns and energy levels.'
      });
      
      // Generate initial summary
      const actionTexts = taskData.suggestedActions
        .filter(action => action.default)
        .map(action => action.text);
        
      setSummary(
        `Addressed ${taskData.title} by implementing: ${actionTexts.join(", ")}. ` +
        `Patient reported ${taskData.evidenceFromCall[0].text.toLowerCase()} ` +
        `Will follow-up to monitor progress.`
      );
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

    // Update summary based on selected actions
    if (task) {
      const actionTexts = task.suggestedActions
        .filter(action => {
          if (action.id === actionId) {
            return checked;
          }
          return selectedActions.includes(action.id);
        })
        .map(action => action.text);

      setSummary(
        `Addressed ${task.title} by implementing: ${actionTexts.join(", ")}. ` +
        (manualAction ? `Added custom plan: ${manualAction}. ` : '') +
        `Patient reported ${task.evidenceFromCall[0].text.toLowerCase()} ` +
        `Will follow-up to monitor progress.`
      );
    }
  };

  // Handle adding manual action
  const handleAddManualAction = () => {
    if (manualAction.trim()) {
      // Update summary to include manual action
      setSummary(prev => {
        return prev + ` Added custom plan: ${manualAction}.`;
      });
      setManualAction(""); // Clear the input field
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
      navigate('/'); // Return to home page after task completion
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading task...</div>;
  }

  if (!task) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto text-amber-500" size={48} />
              <h2 className="text-2xl font-bold mt-4">Task Not Found</h2>
              <p className="text-gray-600 mt-2">The care task you're looking for could not be found.</p>
              <Button className="mt-6" onClick={() => navigate('/')}>Return to Dashboard</Button>
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
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" size={16} /> Back
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
                  <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
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
              Patient call from April 3, 2025
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

export default CareTaskDetail;
