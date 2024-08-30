import { Subject } from './subject';
import { User } from './user';

export interface QuestionAlternative {
  text: string;
  correct: boolean;
}

export interface QuestionType {
  id: number;
  name: string;
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
  subject_obj?: Subject;
  created_by: number;
  reported_by: number;
  reported_by_obj?: User;
}

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
  user_obj?: User;
}

export interface QuestionsByTab {
  value: number;
  label: string;
  questions: Question[];
}

export interface QuestionFilter {
  start_year: string;
  end_year: string;
  authorship: string[];
  subjects: number[];
  using: string[];
  order_by: string;
}
