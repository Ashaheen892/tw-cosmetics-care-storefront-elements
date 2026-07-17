export type ViewMode = 'single' | 'compare';
export type CompareStyle = 'split' | 'slider' | 'side';
export type TransitionKind = 'fade' | 'slide' | 'none';
export type Finish = 'any' | 'matte' | 'dewy' | 'glossy' | 'natural' | 'velvet';

export interface LightState {
  id: string;
  name: string;
  icon: string;
  image: string;
  imageMobile: string;
  finish: Finish;
  desc: string;
  colorEffect: string;
  gloss: number;
  clarity: number;
  contrast: number;
  palette: string[];
  note: string;
  link: string;
}
