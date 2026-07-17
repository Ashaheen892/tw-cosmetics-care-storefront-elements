export type DimensionKey = 'product_type' | 'skin' | 'undertone' | 'result';

export interface StepOption {
  value: string;
  label: string;
}

export interface StepDef {
  key: DimensionKey;
  label: string;
  options: StepOption[];
}

export interface Shade {
  id: string;
  hex: string;
  shade_name: string;
  shade_number: string;
  name: string;
  desc: string;
  link: string;
  /** Dimension values this shade matches ("" = matches any). */
  product_type: string;
  skin: string;
  undertone: string;
  result: string;
}

export type ShadeSelection = Partial<Record<DimensionKey, string>>;
