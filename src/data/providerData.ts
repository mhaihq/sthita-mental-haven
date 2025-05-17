
export interface Provider {
  id: string;
  name: string;
  role: 'Psychiatrist' | 'Psychologist' | 'Therapist' | 'Counselor';
  specialty: string[];
  availability: string[];
  profileImage?: string;
  bio: string;
}

export const providers: Provider[] = [
  {
    id: "DR-001",
    name: "Dr. Maya Patel",
    role: "Psychiatrist",
    specialty: ["Medication Management", "Treatment-Resistant Depression", "Anxiety Disorders"],
    availability: ["Monday AM", "Wednesday PM", "Thursday PM"],
    bio: "Dr. Patel specializes in medication management for complex mood disorders, with 15 years of experience in treating treatment-resistant depression. She takes a holistic approach to psychiatric care, considering lifestyle factors alongside pharmacological interventions."
  },
  {
    id: "DR-002",
    name: "Dr. Sarah Chen",
    role: "Psychologist",
    specialty: ["Cognitive Behavioral Therapy", "Trauma-Informed Care", "Depression"],
    availability: ["Monday PM", "Tuesday Full Day", "Friday AM"],
    bio: "Dr. Chen is a licensed clinical psychologist with expertise in evidence-based therapies for depression and anxiety. She specializes in helping clients understand the connection between thoughts, feelings, and behaviors using CBT techniques."
  },
  {
    id: "DR-003",
    name: "Dr. Michael Thomas",
    role: "Psychologist",
    specialty: ["Sleep Disorders", "Behavioral Activation", "Mindfulness"],
    availability: ["Wednesday Full Day", "Thursday AM", "Friday PM"],
    bio: "Dr. Thomas focuses on the intersection of sleep health and mental wellbeing. He specializes in cognitive behavioral therapy for insomnia (CBT-I) and integrates mindfulness-based approaches into his treatment plans."
  },
  {
    id: "DR-004",
    name: "Dr. Elena Rodriguez",
    role: "Psychiatrist",
    specialty: ["Diagnostic Assessment", "Women's Mental Health", "Mood Disorders"],
    availability: ["Tuesday AM", "Thursday Full Day", "Friday PM"],
    bio: "Dr. Rodriguez has extensive experience in complex diagnostic assessments and specializes in women's mental health issues. She takes a collaborative approach to treatment planning, partnering with therapists to provide comprehensive care."
  }
];

// Currently assigned providers to our patient
export const patientProviders = ["DR-001", "DR-002", "DR-003"];
