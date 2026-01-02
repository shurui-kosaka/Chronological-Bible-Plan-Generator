
export interface ReadingDay {
  day: number;
  date: string;
  passages: string;
  completed: boolean;
}

export interface PlanConfig {
  startDate: string;
  planName: string;
  durationDays: number;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
