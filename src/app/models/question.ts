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
  created_by: number;
  reported_by: number;
}
