import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export const CONFIG = {
  maxWidth: '640px',
  width: '100%',
};

@Component({
  selector: 'app-change-role-modal',
  templateUrl: './change-role-modal.component.html',
  styleUrls: ['./change-role-modal.component.scss'],
})
export class ChangeRoleModalComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  role = this.fb.control(1);
  curseOfRoles = this.fb.array([this.fb.control(1)]);

  roles = [
    {
      id: 1,
      role: 'NDE',
      multipleCurses: false,
      curses: [
        {
          id: 1,
          name: 'Administração',
        },
        {
          id: 2,
          name: 'Ciências Contábeis',
        },
        {
          id: 3,
          name: 'Direito',
        },
        {
          id: 4,
          name: 'Engenharia Civil',
        },
        {
          id: 5,
          name: 'Engenharia de Produção',
        },
        {
          id: 6,
          name: 'Engenharia Elétrica',
        },
        {
          id: 7,
          name: 'Engenharia Mecânica',
        },
        {
          id: 8,
          name: 'Farmácia',
        },
        {
          id: 9,
          name: 'Fisioterapia',
        },
        {
          id: 10,
          name: 'Nutrição',
        },
        {
          id: 11,
          name: 'Psicologia',
        },
        {
          id: 12,
          name: 'Sistemas de Informação',
        },
      ],
    },
    {
      id: 2,
      role: 'Diretor(a) de Centro',
      multipleCurses: true,
      curses: [
        {
          id: 1,
          name: 'Centro de Ciências Sociais Aplicadas',
        },
        {
          id: 2,
          name: 'Centro de Ciências da Saúde',
        },
        {
          id: 3,
          name: 'Centro de Ciências Exatas e Tecnológicas',
        },
      ],
    },
    {
      id: 3,
      role: 'Professor',
      multipleCurses: false,
      curses: [
        {
          id: 1,
          name: 'Administração',
        },
        {
          id: 2,
          name: 'Ciências Contábeis',
        },
        {
          id: 3,
          name: 'Direito',
        },
        {
          id: 4,
          name: 'Engenharia Civil',
        },
        {
          id: 5,
          name: 'Engenharia de Produção',
        },
        {
          id: 6,
          name: 'Engenharia Elétrica',
        },
        {
          id: 7,
          name: 'Engenharia Mecânica',
        },
        {
          id: 8,
          name: 'Farmácia',
        },
        {
          id: 9,
          name: 'Fisioterapia',
        },
        {
          id: 10,
          name: 'Nutrição',
        },
        {
          id: 11,
          name: 'Psicologia',
        },
        {
          id: 12,
          name: 'Sistemas de Informação',
        },
      ],
    },
  ];

  ngOnInit() {
    this.curseOfRoles.clear();

    this.roles.forEach((role) => {
      this.curseOfRoles.push(this.fb.control(role.curses[0].id));
    });
  }

  getCurseControl(index: number) {
    return this.curseOfRoles.at(index);
  }

  getCursesList(curses: (typeof this.roles)[0]['curses']) {
    return curses.map((curse) => curse.name).join(', ');
  }
}
