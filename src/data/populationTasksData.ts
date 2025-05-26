export interface PopulationTask {
  id: string;
  title: string;
  patientName: string;
  patientId: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  status: 'needs-review' | 'in-progress' | 'needs-qhp' | 'completed';
  assignedTo?: string;
  dueDate: string;
  taskType: string;
  triggeredBy?: string;
  callDate?: string;
}

export const populationTasksData: PopulationTask[] = [
  // Sthita Pujari - High Priority Hana-triggered insights
  {
    id: 'T-1001',
    title: 'PHQ-9 Score Increased',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Score increased from 8 to 13 during Hana call',
    priority: 'High',
    estimatedTime: '5 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Mental Health Alert',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-25'
  },
  {
    id: 'T-1002',
    title: 'Missed Medications This Week',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: '2 doses of Sertraline missed (May 23-24) - reported during call',
    priority: 'High',
    estimatedTime: '4 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Medication Adherence',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-25'
  },
  {
    id: 'T-1003',
    title: 'Sleep Pattern Disruption',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Reports waking up 3-4 times per night, affecting daily function',
    priority: 'Medium',
    estimatedTime: '3 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Sleep Health',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-24'
  },
  {
    id: 'T-1004',
    title: 'Work Stress Escalation',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Mentioned feeling overwhelmed with upcoming deadline stress',
    priority: 'Medium',
    estimatedTime: '6 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Psychosocial Risk',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-24'
  },

  // Other patients - Hana-triggered insights
  {
    id: 'T-2001',
    title: 'Anxiety Spike During Calls',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'GAD-7 indicators increased, mentions panic symptoms',
    priority: 'High',
    estimatedTime: '7 min',
    status: 'in-progress',
    assignedTo: 'Dr. Sarah Wilson',
    dueDate: '2025-05-27',
    taskType: 'Mental Health Alert',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-23'
  },
  {
    id: 'T-2002',
    title: 'Social Isolation Pattern',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'Reports avoiding social activities for 2 weeks straight',
    priority: 'Medium',
    estimatedTime: '5 min',
    status: 'needs-review',
    dueDate: '2025-05-29',
    taskType: 'Behavioral Health',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-23'
  },
  {
    id: 'T-3001',
    title: 'Medication Side Effects Concern',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    description: 'Reports dizziness and fatigue since mood stabilizer increase',
    priority: 'High',
    estimatedTime: '6 min',
    status: 'needs-qhp',
    dueDate: '2025-05-26',
    taskType: 'Medication Review',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-22'
  },
  {
    id: 'T-4001',
    title: 'PTSD Trigger Identification',
    patientName: 'Robert Chen',
    patientId: 'P100595',
    description: 'Identified new workplace trigger affecting sleep and concentration',
    priority: 'Medium',
    estimatedTime: '7 min',
    status: 'in-progress',
    assignedTo: 'Dr. Michael Brown',
    dueDate: '2025-05-30',
    taskType: 'Trauma Response',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-21'
  },
  {
    id: 'T-5001',
    title: 'Therapy Engagement Drop',
    patientName: 'Sarah Johnson',
    patientId: 'P100596',
    description: 'Missed last 2 therapy sessions, reports feeling "therapy fatigue"',
    priority: 'Medium',
    estimatedTime: '4 min',
    status: 'completed',
    assignedTo: 'Nurse Kelly',
    dueDate: '2025-05-25',
    taskType: 'Care Coordination',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-20'
  }
];
