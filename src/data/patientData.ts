// Patient data schema
export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  diagnosis: {
    primary: string;
    code: string;
    date: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    diagnosedBy: string;
  };
  medicalHistory: {
    pastConditions: Array<{
      condition: string;
      diagnosedDate: string;
      status: 'Active' | 'Resolved';
      notes: string;
    }>;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate?: string;
      prescribedBy: string;
    }>;
    allergies: Array<{
      allergen: string;
      reaction: string;
      severity: 'Mild' | 'Moderate' | 'Severe';
    }>;
    familyHistory: Array<{
      condition: string;
      relation: string;
      notes: string;
    }>;
  };
  treatmentPlan: {
    goals: Array<{
      description: string;
      status: 'Not Started' | 'In Progress' | 'Achieved';
      targetDate?: string;
    }>;
    interventions: Array<{
      type: string;
      frequency: string;
      notes: string;
    }>;
    assessments: Array<{
      name: string;
      date: string;
      score: string;
      administrator: string;
      notes?: string;
    }>;
  };
  sessionNotes: Array<{
    id: string;
    date: string;
    provider: string;
    duration: string;
    notes: string;
    interventionsUsed: string[];
    medicationChanges?: {
      medication: string;
      change: string;
      reason: string;
    };
    nextAppointment?: string;
    moodRating: number; // 1-10
  }>;
}

// Mock data for our patient
export const patientData: PatientData = {
  id: "P100592",
  name: "Sthita Pujari",
  dateOfBirth: "1997-05-15",
  gender: "Male",
  contactInfo: {
    phone: "(555) 123-4567",
    email: "sthita.p@example.com",
    address: "123 Wellness Ave, Serenity, CA 90210"
  },
  insurance: {
    provider: "HealthGuard Insurance",
    policyNumber: "HGI-2023-78901",
    groupNumber: "MH-CARE-X42"
  },
  emergencyContact: {
    name: "Rajan Pujari",
    relationship: "Father",
    phone: "(555) 987-6543"
  },
  diagnosis: {
    primary: "Major Depressive Disorder, Recurrent",
    code: "F33.2",
    date: "2023-02-15",
    severity: "Moderate",
    diagnosedBy: "Dr. Elena Rodriguez"
  },
  medicalHistory: {
    pastConditions: [
      {
        condition: "Generalized Anxiety Disorder",
        diagnosedDate: "2021-06-10",
        status: "Active",
        notes: "Comorbid with depression. Exacerbated by work stress."
      },
      {
        condition: "Hypothyroidism",
        diagnosedDate: "2020-03-22",
        status: "Active",
        notes: "Well-controlled with levothyroxine 50mcg daily."
      }
    ],
    medications: [
      {
        name: "Sertraline (Zoloft)",
        dosage: "100mg",
        frequency: "Once daily",
        startDate: "2023-02-20",
        prescribedBy: "Dr. Maya Patel"
      },
      {
        name: "Levothyroxine",
        dosage: "50mcg",
        frequency: "Once daily, morning",
        startDate: "2020-03-25",
        prescribedBy: "Dr. James Wilson"
      },
      {
        name: "Lorazepam (Ativan)",
        dosage: "0.5mg",
        frequency: "As needed for severe anxiety",
        startDate: "2023-03-15",
        prescribedBy: "Dr. Maya Patel"
      },
      {
        name: "Trazodone",
        dosage: "50mg",
        frequency: "Once daily at bedtime",
        startDate: "2023-04-10",
        prescribedBy: "Dr. Maya Patel"
      }
    ],
    allergies: [
      {
        allergen: "Penicillin",
        reaction: "Hives, difficulty breathing",
        severity: "Severe"
      }
    ],
    familyHistory: [
      {
        condition: "Depression",
        relation: "Mother",
        notes: "Diagnosed in her 40s, treated with SSRIs"
      },
      {
        condition: "Alcohol Use Disorder",
        relation: "Father",
        notes: "In recovery for 10+ years"
      }
    ]
  },
  treatmentPlan: {
    goals: [
      {
        description: "Reduce depressive symptoms by 50% as measured by PHQ-9",
        status: "In Progress",
        targetDate: "2023-08-15"
      },
      {
        description: "Establish healthy sleep routine with 7-8 hours of sleep per night",
        status: "In Progress",
        targetDate: "2023-07-01"
      },
      {
        description: "Return to full-time work with appropriate accommodations",
        status: "Not Started",
        targetDate: "2023-10-01"
      }
    ],
    interventions: [
      {
        type: "Cognitive Behavioral Therapy (CBT)",
        frequency: "Weekly sessions",
        notes: "Focusing on negative thought patterns related to work performance and self-worth"
      },
      {
        type: "Medication Management",
        frequency: "Monthly reviews",
        notes: "Monitoring efficacy and side effects of Sertraline"
      },
      {
        type: "Mindfulness Practice",
        frequency: "Daily, 10-15 minutes",
        notes: "Using Calm app for guided meditation focused on anxiety reduction"
      }
    ],
    assessments: [
      {
        name: "PHQ-9 (Depression Screening)",
        date: "2023-05-15",
        score: "16 (Moderately severe depression)",
        administrator: "Dr. Sarah Chen",
        notes: "Decrease from initial score of 21"
      },
      {
        name: "GAD-7 (Anxiety Screening)",
        date: "2023-05-15",
        score: "14 (Moderate anxiety)",
        administrator: "Dr. Sarah Chen"
      },
      {
        name: "Sleep Quality Assessment",
        date: "2023-05-10",
        score: "Poor - averaging 5hrs/night with frequent wakings",
        administrator: "Dr. Michael Thomas"
      }
    ]
  },
  sessionNotes: [
    {
      id: "SN-2345",
      date: "2023-05-15",
      provider: "Dr. Sarah Chen",
      duration: "50 minutes",
      notes: "Patient reports continued difficulty with sleep but mild improvement in mood. Has been practicing mindfulness exercises 3-4 times per week. Discussed work stressors and developed plan for gradual return to work. Homework: Continue sleep journal and try progressive muscle relaxation before bed.",
      interventionsUsed: ["CBT", "Mindfulness", "Sleep hygiene education"],
      nextAppointment: "2023-05-22",
      moodRating: 5
    },
    {
      id: "SN-2344",
      date: "2023-05-08",
      provider: "Dr. Maya Patel",
      duration: "30 minutes",
      notes: "Medication management session. Patient reports some improvement in mood since increasing Sertraline to 100mg, but continues to have sleep disruption. Adding low-dose Trazodone for sleep. No concerning side effects from current medications.",
      interventionsUsed: ["Medication management", "Psychoeducation"],
      medicationChanges: {
        medication: "Trazodone",
        change: "Added 50mg at bedtime",
        reason: "Sleep initiation and maintenance"
      },
      nextAppointment: "2023-06-05",
      moodRating: 4
    },
    {
      id: "SN-2343",
      date: "2023-05-01",
      provider: "Dr. Sarah Chen",
      duration: "50 minutes",
      notes: "Focused on identifying and challenging negative core beliefs related to self-worth. Patient brought up childhood experiences of high parental expectations. Beginning to see connection between these experiences and current perfectionism at work. Some resistance to self-compassion exercises.",
      interventionsUsed: ["CBT", "Schema work", "Self-compassion exercises"],
      nextAppointment: "2023-05-08",
      moodRating: 3
    },
    {
      id: "SN-2342",
      date: "2023-04-24",
      provider: "Dr. Michael Thomas",
      duration: "50 minutes",
      notes: "Initial consultation for specialized sleep assessment. Patient reports 2+ years of sleep difficulties, worsening with depression onset. Averaging 5 hours of fragmented sleep. Discussed sleep hygiene practices and initiated sleep journal. Recommended consistent wake time even on weekends.",
      interventionsUsed: ["Sleep assessment", "Psychoeducation", "CBT-I introduction"],
      nextAppointment: "2023-05-22",
      moodRating: 3
    },
    {
      id: "SN-2341",
      date: "2023-04-17",
      provider: "Dr. Sarah Chen",
      duration: "50 minutes",
      notes: "Patient arrived on time but visibly distressed. Reported conflict with supervisor at work, triggering thoughts of inadequacy. Applied thought record technique in session. Some insight into catastrophic thinking patterns. Mood remained low throughout session but reported feeling 'slightly lighter' by end.",
      interventionsUsed: ["CBT", "Crisis management", "Thought records"],
      nextAppointment: "2023-04-24",
      moodRating: 2
    },
  ]
};
