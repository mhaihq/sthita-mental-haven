
import { CareTask, CptCodeData, CptCodeInfo } from './types';

// CPT code data with descriptions
export const cptCodeInfo: Record<string, CptCodeInfo> = {
  '99490': {
    description: 'Chronic Care Management',
    requirements: '2+ chronic conditions, 20 min/month',
    rateInfo: 'Medicare: ~$42/month'
  },
  '99484': {
    description: 'Behavioral Health Integration',
    requirements: 'Mental/behavioral condition, 20 min/month',
    rateInfo: 'Medicare: ~$48/month'
  }
};

// Task data grouped by CPT codes
export const careTasksData: CptCodeData = {
  '99490': [
    {
      id: 'T-1002',
      title: 'Missed Medications This Week',
      description: '2 doses of Lisinopril missed (Apr 3-4)',
      category: 'Medication',
      categoryColor: 'yellow',
      minutes: 5,
      insight: 'Flagged by Adherence Agent — 11% drop in last 30 days',
      status: 'assigned'
    },
    {
      id: 'T-1004', 
      title: 'Blood Pressure Follow-up',
      description: 'BP reading 138/88 on Apr 5',
      category: 'Vitals',
      categoryColor: 'blue',
      minutes: 5,
      insight: 'Mild elevation from baseline (120/80)',
      status: 'pending'
    },
    {
      id: 'T-1005',
      title: 'Social Determinants Assessment',
      description: 'Quarterly SDOH check-in',
      category: 'Assessment',
      categoryColor: 'green',
      minutes: 10,
      insight: 'Previously flagged transportation issues',
      status: 'pending'
    }
  ],
  '99484': [
    {
      id: 'T-1001',
      title: 'PHQ-9 Score Increased',
      description: 'Score increased from 8 to 13',
      category: 'Mental-health',
      categoryColor: 'pink',
      minutes: 10,
      insight: 'Flagged by AI from Apr 3 call — mentions job stress',
      status: 'urgent'
    },
    {
      id: 'T-1003',
      title: 'Sleep Pattern Changes',
      description: 'Reported difficulty staying asleep',
      category: 'Mental-health',
      categoryColor: 'purple',
      minutes: 5,
      insight: 'Mentioned in last AI call, possible side effect',
      status: 'assigned'
    },
    {
      id: 'T-1006',
      title: 'GAD-7 Anxiety Assessment Due',
      description: 'Quarterly anxiety screening overdue',
      category: 'Mental-health',
      categoryColor: 'orange',
      minutes: 8,
      insight: 'Last score was 12 (moderate anxiety), trending upward',
      status: 'pending'
    },
    {
      id: 'T-1007',
      title: 'Medication Adherence Check',
      description: 'Sertraline compliance review needed',
      category: 'Mental-health',
      categoryColor: 'blue',
      minutes: 7,
      insight: 'Patient mentioned forgetting weekend doses in last call',
      status: 'assigned'
    },
    {
      id: 'T-1008',
      title: 'Crisis Safety Plan Update',
      description: 'Emergency contacts need verification',
      category: 'Mental-health',
      categoryColor: 'red',
      minutes: 12,
      insight: 'Recent life changes require plan adjustment',
      status: 'urgent'
    },
    {
      id: 'T-1009',
      title: 'Therapy Session Coordination',
      description: 'Schedule follow-up with therapist',
      category: 'Mental-health',
      categoryColor: 'green',
      minutes: 6,
      insight: 'Patient expressed interest in increasing session frequency',
      status: 'pending'
    },
    {
      id: 'T-1010',
      title: 'Substance Use Screening',
      description: 'AUDIT-C screening due for renewal',
      category: 'Mental-health',
      categoryColor: 'yellow',
      minutes: 9,
      insight: 'Previous screening showed moderate risk patterns',
      status: 'assigned'
    },
    {
      id: 'T-1011',
      title: 'Social Support Assessment',
      description: 'Evaluate current support network',
      category: 'Mental-health',
      categoryColor: 'teal',
      minutes: 11,
      insight: 'Recent isolation concerns noted in documentation',
      status: 'pending'
    }
  ]
};

export const totalRequiredMinutes = {
  '99490': 20,
  '99484': 20
};

export const completedMinutes = {
  '99490': 6,
  '99484': 4
};
