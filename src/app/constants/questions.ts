import {
  BloomTaxonomy,
  QuestionCheckType,
  QuestionDifficulty,
  ReviewFeedbackType,
} from '@app/models/question';

export const BLOOM_TAXONOMY: {
  value: BloomTaxonomy;
  label: string;
}[] = [
  {
    value: 'remember',
    label: 'Lembrar',
  },
  {
    value: 'understand',
    label: 'Entender',
  },
  {
    value: 'apply',
    label: 'Aplicar',
  },
  {
    value: 'analyze',
    label: 'Analisar',
  },
  {
    value: 'evaluate',
    label: 'Avaliar',
  },
  {
    value: 'create',
    label: 'Criar',
  },
];

export const CHECK_TYPES: {
  value: QuestionCheckType;
  label: string;
}[] = [
  {
    value: 'unique_answer',
    label: 'Resposta única',
  },
  {
    value: 'incomplete_affirmation',
    label: 'Afirmação incompleta',
  },
  {
    value: 'multiple_answer',
    label: 'Resposta múltipla',
  },
  {
    value: 'negative_focus',
    label: 'Foco negativo',
  },
  {
    value: 'assertion_and_reason',
    label: 'Afirmativa e razão',
  },
  {
    value: 'gap',
    label: 'Lacuna',
  },
  {
    value: 'interpretation',
    label: 'Interpretação',
  },
  {
    value: 'association',
    label: 'Associação',
  },
  {
    value: 'ordering_or_ranking',
    label: 'Ordenação ou classificação',
  },
  {
    value: 'constant_alternatives',
    label: 'Alternativas constantes',
  },
];

export const QUESTION_DIFFICULTIES: {
  value: QuestionDifficulty;
  label: string;
}[] = [
  {
    value: 'easy',
    label: 'Fácil',
  },
  {
    value: 'medium',
    label: 'Médio',
  },
  {
    value: 'hard',
    label: 'Difícil',
  },
];

export const FEEDBACK_TYPES: {
  value: ReviewFeedbackType;
  label: string;
}[] = [
  {
    value: 'request_changes',
    label: 'Reprovado',
  },
  {
    value: 'approve',
    label: 'Aprovado',
  },
  {
    value: 'answer',
    label: 'Devolvido',
  },
];

export const QUESTION_TABS = [
  {
    value: 'draft',
    label: 'Rascunhos',
  },
  {
    value: 'waiting_your_review',
    label: 'Aguardando seu parecer',
  },
  {
    value: 'waiting_review',
    label: 'Aguardando parecer do revisor',
  },
  {
    value: 'with_requested_changes',
    label: 'Aguardando alterações',
  },
  {
    value: 'approved',
    label: 'Aprovadas',
  },
  {
    value: 'registered',
    label: 'Cadastradas',
  },
];
