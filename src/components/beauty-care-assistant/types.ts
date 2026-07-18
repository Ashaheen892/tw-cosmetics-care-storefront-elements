export interface TrailStep {
  questionKey: string;
  questionText: string;
  answerLabel: string;
}

export interface AssistantAnswer {
  id: string;
  label: string;
  image: string;
  /** Key of the next question; empty means this answer is a terminal result. */
  next: string;
  result_title: string;
  result_desc: string;
  link: string;
  link_text: string;
}

export interface AssistantQuestion {
  key: string;
  text: string;
  image: string;
  answers: AssistantAnswer[];
}

export type AssistantStyle = 'chat' | 'expert' | 'mirror' | 'cards';
