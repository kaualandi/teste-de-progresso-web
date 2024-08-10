import { Subject } from './subject';
import { User } from './user';

export interface QuestionAlternative {
  text: string;
  correct: boolean;
}

export type BloomTaxonomy =
  | 'remember'
  | 'understand'
  | 'apply'
  | 'analyze'
  | 'evaluate'
  | 'create';

export type QuestionCheckType =
  | 'unique_answer'
  | 'incomplete_affirmation'
  | 'multiple_answer'
  | 'negative_focus'
  | 'assertion_and_reason'
  | 'gap'
  | 'interpretation'
  | 'association'
  | 'ordering_or_ranking'
  | 'constant_alternatives';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type QuestionStatus =
  | 'draft'
  | 'waiting_review'
  | 'with_requested_changes'
  | 'approved'
  | 'registered';

export interface Question {
  id: number;
  alternatives: QuestionAlternative[];
  authorship: string;
  authorship_year: string;
  bloom_taxonomy: BloomTaxonomy;
  body: string;
  check_type: QuestionCheckType;
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

export type ReviewFeedbackType = 'request_changes' | 'approve' | 'answer';

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
  value: string;
  label: string;
  questions: Question[];
}

export interface QuestionFilter {
  start_year: string;
  end_year: string;
  authorship: string[];
  subjects: number[];
}
