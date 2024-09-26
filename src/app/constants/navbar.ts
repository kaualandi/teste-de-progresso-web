export const NAVBAR_PAGES: {
  label: string;
  icon: string;
  link: string;
  permissions: string[];
  isAdmin: boolean;
}[] = [
  {
    label: 'Início',
    icon: 'house',
    link: '/',
    permissions: ['ADMIN', 'TEACHER'],
    isAdmin: false,
  },
  {
    label: 'Questões',
    icon: 'file',
    link: '/questions',
    permissions: ['ADMIN', 'TEACHER'],
    isAdmin: false,
  },
  {
    label: 'Provas',
    icon: 'book',
    link: '/exams',
    permissions: ['ADMIN', 'TEACHER'],
    isAdmin: false,
  },
  {
    label: 'Ajustes',
    icon: 'gear',
    link: '/settings',
    permissions: ['ADMIN', 'TEACHER'],
    isAdmin: false,
  },
];
