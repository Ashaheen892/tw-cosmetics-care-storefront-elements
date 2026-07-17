export type HarmonyType = 'complementary' | 'analogous' | 'triadic';

export interface HarmonyColor {
  id: string;
  name: string;
  hex: string;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export interface ZoneMap {
  lips: string;
  eyes: string;
  cheeks: string;
}
