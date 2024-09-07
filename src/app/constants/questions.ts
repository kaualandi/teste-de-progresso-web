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
    label: 'Aguardando seu Parecer',
  },
  {
    value: QuestionStatus.WAITING_REVIEW,
    label: 'Aguardando Parecer do Revisor',
  },
  {
    value: QuestionStatus.WITH_REQUESTED_CHANGES,
    label: 'Pendentes de Alterações',
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

export const QUESTION_STATUS_NAME = {
  [QuestionStatus.DRAFT]: 'Rascunho',
  [QuestionStatus.WAITING_REVIEW]: 'Aguardando Revisão',
  [QuestionStatus.WITH_REQUESTED_CHANGES]: 'Com Alterações Pendentes',
  [QuestionStatus.APPROVED]: 'Aprovada',
  [QuestionStatus.REGISTERED]: 'Cadastrada',
};

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
