export type RevealMode =
  | 'bag'
  | 'box'
  | 'drawers'
  | 'petals'
  | 'curtain'
  | 'carousel';

export const REVEAL_MODES: RevealMode[] = [
  'bag',
  'box',
  'drawers',
  'petals',
  'curtain',
  'carousel',
];

export interface RevealItem {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  link: string;
}
