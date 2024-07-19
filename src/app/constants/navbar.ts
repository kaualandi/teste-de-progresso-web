import { RoleUser } from '@app/models/user';

export const NAVBAR_PAGES: {
  label: string;
  icon: string;
  link: string;
  roles: RoleUser[];
}[] = [
  {
    label: 'Início',
    icon: 'house',
    link: '/',
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard',
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    label: 'Questões',
    icon: 'file',
    link: '/questions',
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    label: 'Revisões',
    icon: 'list_check',
    link: '/reviews',
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    label: 'Provas',
    icon: 'book',
    link: '/exams',
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    label: 'Ajustes',
    icon: 'gear',
    link: '/settings',
    roles: ['ADMIN', 'TEACHER'],
  },
];
