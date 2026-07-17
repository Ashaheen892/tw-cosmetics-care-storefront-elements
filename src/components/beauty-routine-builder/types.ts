export type QuestionKey = 'skin' | 'concern' | 'time' | 'routine';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  key: QuestionKey;
  label: string;
  options: QuestionOption[];
}

export interface RoutineStep {
  id: string;
  step_name: string;
  step_desc: string;
  order: number;
  /** quick | basic | complete — minimum routine depth this step appears in. */
  level: string;
  skin: string;
  concern: string;
  time: string;
  image: string;
  name: string;
  link: string;
}

export type Answers = Partial<Record<QuestionKey, string>>;
