const ALL_ROLES = [1, 2, 3, 4, 5, 6];

export const NAVBAR_PAGES: {
  label: string;
  icon: string;
  link: string;
  roles: number[];
  isAdmin: boolean;
}[] = [
  {
    label: 'Início',
    icon: 'house',
    link: '/',
    roles: ALL_ROLES,
    isAdmin: false,
  },
  {
    label: 'Questões',
    icon: 'file',
    link: '/questions',
    roles: [1, 2, 3],
    isAdmin: false,
  },
  {
    label: 'Provas',
    icon: 'book',
    link: '/exams',
    roles: [1, 3, 4],
    isAdmin: false,
  },
  {
    label: 'Ajustes',
    icon: 'gear',
    link: '/settings',
    roles: ALL_ROLES,
    isAdmin: false,
  },

  // ! ---- ADMIN PAGES ---- !
  {
    label: 'Usuários',
    icon: 'users',
    link: '/admin/users',
    roles: [],
    isAdmin: true,
  },
  {
    label: 'Cursos',
    icon: 'graduation_cap',
    link: '/admin/courses',
    roles: [],
    isAdmin: true,
  },
  {
    label: 'Perfis',
    icon: 'user_shield',
    link: '/admin/roles',
    roles: [],
    isAdmin: true,
  },
  {
    label: 'Assuntos',
    icon: 'tag',
    link: '/admin/subjects',
    roles: [],
    isAdmin: true,
  },
  {
    label: 'Eixos',
    icon: 'diagram_project',
    link: '/admin/axes',
    roles: [],
    isAdmin: true,
  },
];
