export type InputMode = 'direct' | 'category';
export type ExpiryState = 'safe' | 'warn' | 'expired' | 'future';
export type DateFormat = 'long' | 'short' | 'iso';

export interface PaoCategory {
  id: string;
  name: string;
  icon: string;
  paoMonths: number;
}

export interface PaoOption {
  months: number;
  label: string;
}

export interface SavedRecord {
  id: string;
  name: string;
  category: string;
  open: string;
  pao: number;
  note: string;
}

export interface ExpiryResult {
  expiry: Date;
  daysRemaining: number;
  totalDays: number;
  elapsedRatio: number;
  state: ExpiryState;
}
