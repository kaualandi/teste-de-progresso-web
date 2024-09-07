import {
  BloomTaxonomy,
  QuestionDifficulty,
  QuestionStatus,
  ReviewFeedbackType,
} from '@app/models/question';

export const BLOOM_TAXONOMY: {
  value: BloomTaxonomy;
  label: string;
}[] = [
  {
    value: BloomTaxonomy.REMEMBER,
    label: 'Recordar',
  },
  {
    value: BloomTaxonomy.UNDERSTAND,
    label: 'Compreender',
  },
  {
    value: BloomTaxonomy.APPLY,
    label: 'Aplicar',
  },
  {
    value: BloomTaxonomy.ANALYZE,
    label: 'Analisar',
  },
  {
    value: BloomTaxonomy.EVALUATE,
    label: 'Avaliar',
  },
  {
    value: BloomTaxonomy.CREATE,
    label: 'Criar',
  },
];

export const QUESTION_DIFFICULTIES: {
  value: QuestionDifficulty;
  label: string;
}[] = [
  {
    value: QuestionDifficulty.EASY,
    label: 'Fácil',
  },
  {
    value: QuestionDifficulty.MEDIUM,
    label: 'Médio',
  },
  {
    value: QuestionDifficulty.HARD,
    label: 'Difícil',
  },
];

export const FEEDBACK_TYPES: {
  value: ReviewFeedbackType;
  label: string;
}[] = [
  {
    value: ReviewFeedbackType.REQUEST_CHANGES,
    label: 'Reprovado',
  },
  {
    value: ReviewFeedbackType.APPROVE,
    label: 'Aprovado',
  },
  {
    value: ReviewFeedbackType.ANSWER,
    label: 'Devolvido',
  },
];

export const QUESTION_TABS = [
  {
    value: QuestionStatus.DRAFT,
    label: 'Rascunhos',
  },
  {
    value: 5,
    label: 'Aguardando seu parecer',
  },
  {
    value: QuestionStatus.WAITING_REVIEW,
    label: 'Aguardando parecer do revisor',
  },
  {
    value: QuestionStatus.WITH_REQUESTED_CHANGES,
    label: 'Aguardando alterações',
  },
  {
    value: QuestionStatus.APPROVED,
    label: 'Aprovadas',
  },
  {
    value: QuestionStatus.REGISTERED,
    label: 'Cadastradas',
  },
];

export const AUTHORSHIP_OPTIONS = [
  {
    value: 'own',
    label: 'Própria',
  },
  {
    value: 'other',
    label: 'Outros',
  },
];
