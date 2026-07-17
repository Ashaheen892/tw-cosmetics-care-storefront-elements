export type FamilyLayout = 'wheel' | 'grid' | 'list';

export interface FragranceFamily {
  id: string;
  name: string;
  color: string;
  icon: string;
  desc: string;
  mood: string[];
  top: string[];
  heart: string[];
  base: string[];
  season: string;
  occasion: string;
  image: string;
  link: string;
}
