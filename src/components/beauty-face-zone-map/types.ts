export type DotShape = 'pulse' | 'ring' | 'number' | 'icon' | 'area' | 'label';
export type DetailMode = 'inline' | 'sheet';

export interface FaceZone {
  id: string;
  name: string;
  x: number;
  y: number;
  dotSize: number;
  dotColor: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  steps: string[];
  tips: string[];
  warning: string;
  image: string;
  link: string;
}
