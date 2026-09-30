export type Subject =
  | "Advanced Mathematics"
  | "Basic Mathematics"
  | "IQ"
  | "Analytical Reasoning"
  | "Quantitative Reasoning"
  | "Computer Science"
  | "Physics"
  | "English"

export type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};