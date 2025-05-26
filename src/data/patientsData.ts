
export interface PatientSummary {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  primaryDiagnosis: string;
  diagnosisCode: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  lastVisit: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive';
  isClickable: boolean;
}

export const patientsData: PatientSummary[] = [
  {
    id: "P100592",
    name: "Sthita Pujari",
    dateOfBirth: "1992-05-15",
    gender: "Female",
    primaryDiagnosis: "Major Depressive Disorder, Recurrent",
    diagnosisCode: "F33.2",
    severity: "Moderate",
    lastVisit: "2023-05-15",
    nextAppointment: "2023-05-22",
    status: "Active",
    isClickable: true
  },
  {
    id: "P100593",
    name: "James Thompson",
    dateOfBirth: "1985-03-22",
    gender: "Male",
    primaryDiagnosis: "Generalized Anxiety Disorder",
    diagnosisCode: "F41.1",
    severity: "Mild",
    lastVisit: "2023-05-10",
    nextAppointment: "2023-05-25",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100594",
    name: "Maria Rodriguez",
    dateOfBirth: "1978-11-08",
    gender: "Female",
    primaryDiagnosis: "Bipolar Disorder Type I",
    diagnosisCode: "F31.1",
    severity: "Severe",
    lastVisit: "2023-05-12",
    nextAppointment: "2023-05-19",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100595",
    name: "Robert Chen",
    dateOfBirth: "1990-07-14",
    gender: "Male",
    primaryDiagnosis: "Post-Traumatic Stress Disorder",
    diagnosisCode: "F43.1",
    severity: "Moderate",
    lastVisit: "2023-05-08",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100596",
    name: "Sarah Johnson",
    dateOfBirth: "1995-01-30",
    gender: "Female",
    primaryDiagnosis: "Social Anxiety Disorder",
    diagnosisCode: "F40.1",
    severity: "Mild",
    lastVisit: "2023-05-05",
    nextAppointment: "2023-05-26",
    status: "Active",
    isClickable: false
  }
];
