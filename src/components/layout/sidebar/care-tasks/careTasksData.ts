
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
