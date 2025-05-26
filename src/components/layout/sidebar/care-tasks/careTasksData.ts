
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

// Task data grouped by CPT codes - matching population tasks for Sthita Pujari
export const careTasksData: CptCodeData = {
  '99490': [
    {
      id: 'T-1002',
      title: 'Missed Medications This Week',
      description: '2 doses of Sertraline missed (May 23-24)',
      category: 'Medication',
      categoryColor: 'yellow',
      minutes: 4,
      insight: 'Flagged by Hana AI Coach during May 25 call - adherence drop affecting mood stability',
      status: 'urgent'
    },
    {
      id: 'T-1003', 
      title: 'Sleep Pattern Disruption',
      description: 'Waking up 3-4 times per night, affecting daily function',
      category: 'Vitals',
      categoryColor: 'blue',
      minutes: 3,
      insight: 'Reported during Hana call on May 24 - possible medication timing issue',
      status: 'pending'
    },
    {
      id: 'T-1004',
      title: 'Work Stress Escalation',
      description: 'Feeling overwhelmed with upcoming deadline stress',
      category: 'Assessment',
      categoryColor: 'green',
      minutes: 6,
      insight: 'Mentioned during Hana call - potential trigger for mood deterioration',
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
      minutes: 5,
      insight: 'Flagged by Hana AI Coach during May 25 call - significant mood decline detected',
      status: 'urgent'
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
