
export interface CptCodeInfo {
  description: string;
  requirements: string;
  rateInfo: string;
}

export interface CareTask {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  minutes: number;
  insight: string;
  status: string;
}

export type CptCodeData = Record<string, CareTask[]>;
