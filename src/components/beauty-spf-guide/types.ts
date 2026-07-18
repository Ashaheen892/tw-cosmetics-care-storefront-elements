export interface Phototype {
  id: string;
  name: string;
  desc: string;
  baseMinutes: number;
  color: string;
}

export interface SpfValue {
  spf: number;
  label: string;
}

export interface SunCondition {
  id: string;
  name: string;
  factor: number;
  desc: string;
}

export type SpfStepKey = 'phototype' | 'spf' | 'condition';
