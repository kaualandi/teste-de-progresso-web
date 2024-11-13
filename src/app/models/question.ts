import { Subject } from './subject';
import { User } from './user';

export interface QuestionAlternative {
  text: string;
  correct: boolean;
}

export interface QuestionType {
  id: number;
  name: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export enum BloomTaxonomy {
  REMEMBER = 0,
  UNDERSTAND = 1,
  APPLY = 2,
  ANALYZE = 3,
  EVALUATE = 4,
  CREATE = 5,
}

export enum QuestionDifficulty {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2,
}

export enum QuestionStatus {
  DRAFT = 0,
  WAITING_REVIEW = 1,
  WITH_REQUESTED_CHANGES = 2,
  APPROVED = 3,
  REGISTERED = 4,
}

export interface Question {
  id: number;
  alternatives: QuestionAlternative[];
  authorship: string;
  authorship_year: string;
  bloom_taxonomy: BloomTaxonomy;
  body: string;
  question_type: number;
  question_type_instance?: QuestionType;
  difficulty: QuestionDifficulty;
  explanation: string;
  instruction: string;
  intention: string;
  references: string;
  status: QuestionStatus;
  support: string;
  created_at: string;
  updated_at: string;
  subject: number;
  subject_instance?: Subject;
  created_by: number;
  created_by_instance?: User;
  reported_by: number;
  reported_by_instance?: User;
}

export type QuestionFromList = Pick<
  Question,
  'id' | 'body' | 'difficulty' | 'status' | 'reported_by' | 'bloom_taxonomy'
> & {
  subject_name: string;
  question_type_name: string;
};

export enum ReviewFeedbackType {
  REQUEST_CHANGES = 0,
  APPROVE = 1,
  ANSWER = 2,
}

export interface ReviewMessage {
  id: number;
  feedback_type: ReviewFeedbackType;
  text: string;
  created_at: string;
  updated_at: string;
  question: number;
  user: number;
  user_instance?: User;
}

export interface QuestionsByTab {
  value: number;
  label: string;
  questions: QuestionFromList[];
}

export interface QuestionFilter {
  start_year: string;
  end_year: string;
  authorship: string[];
  subjects: number[];
  using: string[];
  bloom_taxonomy: number[];
  difficulty: number[];
  order_by: string;
  order_direction: string;
}
