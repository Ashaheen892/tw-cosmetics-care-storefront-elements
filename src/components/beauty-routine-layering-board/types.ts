export type BoardMode = 'guide' | 'quiz';
export type BoardShape = 'layers' | 'drops' | 'bottles' | 'stairs' | 'path' | 'circles';
export type BoardDirection = 'vertical' | 'horizontal';
export type StepPeriod = 'morning' | 'evening' | 'both';

export interface LayerStep {
  id: string;
  title: string;
  icon: string;
  image: string;
  descShort: string;
  descLong: string;
  timing: string;
  wait: string;
  amount: string;
  note: string;
  color: string;
  optional: boolean;
  period: StepPeriod;
  correctOrder: number;
}

export interface Routine {
  id: string;
  name: string;
  steps: LayerStep[];
}
