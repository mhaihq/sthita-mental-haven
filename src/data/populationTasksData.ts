
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
}

export const populationTasksData: PopulationTask[] = [
  {
    id: 'T001',
    title: 'Medication Reconciliation',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Review and update current medications list',
    priority: 'High',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2023-05-23',
    taskType: 'Medication Review'
  },
  {
    id: 'T002',
    title: 'Insurance Verification',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'Verify insurance coverage for upcoming therapy sessions',
    priority: 'Medium',
    estimatedTime: '10 min',
    status: 'needs-review',
    dueDate: '2023-05-24',
    taskType: 'Administrative'
  },
  {
    id: 'T008',
    title: 'Annual Physical Assessment',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Complete comprehensive annual physical examination',
    priority: 'Medium',
    estimatedTime: '30 min',
    status: 'needs-review',
    dueDate: '2023-05-25',
    taskType: 'Clinical Assessment'
  },
  {
    id: 'T009',
    title: 'Therapy Session Follow-up',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Follow up on recent therapy session and medication adjustments',
    priority: 'High',
    estimatedTime: '20 min',
    status: 'needs-review',
    dueDate: '2023-05-23',
    taskType: 'Clinical Follow-up'
  },
  {
    id: 'T003',
    title: 'Crisis Assessment',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    description: 'Conduct urgent mental health crisis assessment',
    priority: 'High',
    estimatedTime: '45 min',
    status: 'in-progress',
    assignedTo: 'Dr. Sarah Wilson',
    dueDate: '2023-05-22',
    taskType: 'Clinical Assessment'
  },
  {
    id: 'T004',
    title: 'Treatment Plan Review',
    patientName: 'Robert Chen',
    patientId: 'P100595',
    description: 'Quarterly review of PTSD treatment plan effectiveness',
    priority: 'Medium',
    estimatedTime: '30 min',
    status: 'in-progress',
    assignedTo: 'Dr. Michael Brown',
    dueDate: '2023-05-25',
    taskType: 'Treatment Planning'
  },
  {
    id: 'T005',
    title: 'Prescription Authorization',
    patientName: 'Sarah Johnson',
    patientId: 'P100596',
    description: 'Get physician authorization for anxiety medication increase',
    priority: 'High',
    estimatedTime: '20 min',
    status: 'needs-qhp',
    dueDate: '2023-05-23',
    taskType: 'Prescription Management'
  },
  {
    id: 'T006',
    title: 'Follow-up Appointment',
    patientName: 'Sthita Pujari',
    patientId: 'P100592',
    description: 'Schedule follow-up after medication adjustment',
    priority: 'Low',
    estimatedTime: '5 min',
    status: 'completed',
    assignedTo: 'Nurse Kelly',
    dueDate: '2023-05-20',
    taskType: 'Scheduling'
  },
  {
    id: 'T007',
    title: 'Lab Results Review',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'Review recent blood work results before next session',
    priority: 'Medium',
    estimatedTime: '10 min',
    status: 'completed',
    assignedTo: 'Dr. Lisa Chen',
    dueDate: '2023-05-21',
    taskType: 'Lab Review'
  }
];
