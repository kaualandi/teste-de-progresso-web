import {
  BloomTaxonomy,
  QuestionCheckType,
  QuestionDifficulty,
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
