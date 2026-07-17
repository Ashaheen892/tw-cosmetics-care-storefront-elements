export interface Ingredient {
  id: string;
  name: string;
  image: string;
  color: string;
  desc: string;
  benefits: string[];
  skin_types: string[];
  usage_time: string;
  note: string;
  texture: string;
  link: string;
}

export interface TextureOption {
  value: string;
  label: string;
}
