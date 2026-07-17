export type CompatibilityLevel = 'compatible' | 'caution' | 'avoid';

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
