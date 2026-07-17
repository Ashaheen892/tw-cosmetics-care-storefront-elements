export type SampleShape = 'drops' | 'circles' | 'swatches' | 'slides' | 'blobs' | 'bubbles';
export type IndicatorType = 'bars' | 'dots' | 'circles' | 'semicircle';

export interface Texture {
  id: string;
  name: string;
  icon: string;
  image: string;
  color: string;
  desc: string;
  lightness: number;
  thickness: number;
  absorption: number;
  hydration: number;
  gloss: number;
  greasiness: number;
  finish: string;
  spread: string;
  amount: string;
  timing: string;
  usage: string;
  tips: string;
  note: string;
}

export interface IndicatorRow {
  key: string;
  label: string;
  value: number;
}
