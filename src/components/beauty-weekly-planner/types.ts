export type Frequency = 'daily' | 'x3' | 'x2' | 'x1' | 'alternate';
export type PlannerView = 'week' | 'am' | 'pm';
export type PlannerSlot = 'am' | 'pm' | 'both';
export type StartDay = 'sat' | 'sun' | 'mon';

export interface PlannerStep {
  id: string;
  name: string;
  color: string;
  icon: string;
  slot: PlannerSlot;
  frequency: Frequency;
  note: string;
}

export interface DaySchedule {
  am: PlannerStep[];
  pm: PlannerStep[];
}
