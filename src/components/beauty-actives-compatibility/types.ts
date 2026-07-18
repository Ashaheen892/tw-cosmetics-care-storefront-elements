export type CompatibilityLevel = 'compatible' | 'caution' | 'avoid';
export type VerdictLevel = CompatibilityLevel | 'unknown' | 'same';

export interface VerdictResult {
  level: VerdictLevel;
  note: string;
  tip: string;
  timing: string;
  hasRule: boolean;
}

export interface Active {
  id: string;
  name: string;
  color: string;
  desc: string;
}

export interface Rule {
  a: string;
  b: string;
  level: CompatibilityLevel;
  note: string;
  timing: string;
}
