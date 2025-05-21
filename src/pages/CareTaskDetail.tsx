
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, Clock, Check, X, Play, Pause, MessageSquare, 
  FileText, ArrowLeft, PlusCircle, Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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

const CareTaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [task, setTask] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioDialog, setShowAudioDialog] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [riskApproved, setRiskApproved] = useState(false);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [manualAction, setManualAction] = useState("");
  const [summary, setSummary] = useState("");

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

  // Handle risk approval
  const handleRiskApproval = (approved: boolean) => {
    setRiskApproved(approved);
    toast({
      title: approved ? "Risk Approved" : "Risk Denied",
      description: approved 
        ? "The risk assessment has been approved and added to the patient record." 
        : "The risk assessment has been marked as not applicable.",
      variant: approved ? "default" : "destructive"
    });
  };

  // Handle action selection
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

      {/* Task content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Summary */}
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
                    onClick={() => setShowAudioDialog(true)}
                  >
                    <Play size={16} className="mr-1" /> Audio & Transcript
                  </Button>
                </div>
                
                <ul className="space-y-2">
                  {task.evidenceFromCall.map((evidence, index) => (
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
              
              {!riskApproved ? (
                <div className="flex gap-3 mt-4">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    onClick={() => handleRiskApproval(true)}
                  >
                    <Check size={16} className="mr-2" /> Approve Risk
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50 flex-1"
                    onClick={() => handleRiskApproval(false)}
                  >
                    <X size={16} className="mr-2" /> Deny Risk
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-md flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  Risk assessment approved
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 2: Care Plan Actions (only shown if risk is approved) */}
          {riskApproved && (
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
                  {task.suggestedActions.map((action) => (
                    <div key={action.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={action.id} 
                        defaultChecked={action.default}
                        onCheckedChange={(checked) => 
                          handleActionToggle(action.id, checked === true)
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
                      onChange={(e) => setManualAction(e.target.value)}
                    />
                    <Button 
                      onClick={handleAddManualAction}
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
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This summary will be added to billing documents.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 3: Follow-up Plan (only shown if risk is approved) */}
          {riskApproved && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 text-green-500" size={20} />
                  Follow-up Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Calendar className="mr-2" size={16} /> Follow-up plan
                    </h3>
                    <Badge className="bg-green-100 text-green-700">Scheduled</Badge>
                  </div>
                  
                  <p className="my-3 text-gray-700">I've scheduled a follow-up for <strong>Apr 10</strong>. Who should handle this call?</p>
                  
                  <div className="flex gap-3 mb-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      AI Assistant
                    </Button>
                    <Button variant="outline">
                      Myself
                    </Button>
                    <Button variant="outline">
                      Escalate
                    </Button>
                    <div className="flex-grow"></div>
                    <Button variant="ghost" className="ml-auto">
                      Change Date
                    </Button>
                  </div>
                  
                  <div className="bg-blue-100 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-blue-800">
                        <MessageSquare size={16} className="mr-1" />
                        <span className="font-medium">For that call, I'll cover these topics:</span>
                      </div>
                      <Badge className="bg-blue-200 text-blue-800">2 selected</Badge>
                    </div>
                    
                    <div className="space-y-2 pl-2">
                      {[
                        { id: 'check-med', label: 'Check medication adherence', checked: true },
                        { id: 'side-effects', label: 'Ask about side effects', checked: true },
                        { id: 'daily', label: 'Review daily medication routine', checked: false },
                        { id: 'refills', label: 'Check if refills are needed', checked: false },
                      ].map(item => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Checkbox id={`followup-${item.id}`} defaultChecked={item.checked} />
                          <label htmlFor={`followup-${item.id}`} className="text-sm text-gray-700">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <label className="text-sm text-gray-700">Want me to add anything else?</label>
                      <div className="flex mt-1">
                        <Input placeholder="Add a custom topic..." className="bg-white" />
                        <Button className="ml-2">Add</Button>
                      </div>
                    </div>

                    <div className="mt-4 p-2 bg-white rounded border border-blue-200">
                      <div className="flex items-center text-sm text-blue-800">
                        <MessageSquare size={14} className="mr-1" /> 
                        AI will call on Apr 10 and cover 2 selected topics: 
                        <span className="font-medium ml-1">
                          Check medication adherence, Ask about side effects
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 4: Finalize (only shown if risk is approved) */}
          {riskApproved && (
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
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
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
                    onClick={handleFinalize}
                  >
                    <Check className="mr-2" size={16} />
                    Complete and Add to Billing
                  </Button>
                </div>
              </CardContent>
            </Card>
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
