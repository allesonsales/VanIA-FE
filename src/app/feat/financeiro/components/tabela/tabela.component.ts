import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

type Filtro = 'escola' | 'status' | 'vencimento';

export interface AlunoFinanceiro {
  id: number;
  aluno: string;
  responsavel: string;
  escola: string;
  vencimento: string;
  valor: string;
  status: string;
}

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent {
  alunos: AlunoFinanceiro[] = [
    {
      id: 1,
      aluno: 'Ana Beatriz Souza',
      responsavel: 'Carlos Souza',
      escola: 'Escola Municipal João Paulo',
      vencimento: 'Rua das Flores, 123 - Centro',
      valor: 'Van 01',
      status: 'Em dia',
    },
    {
      id: 2,
      aluno: 'Lucas Henrique Lima',
      responsavel: 'Mariana Lima',
      escola: 'Colégio São Miguel',
      vencimento: 'Av. Brasil, 456 - Jardim Nova Vida',
      valor: 'Van 02',
      status: 'Em dia',
    },
    {
      id: 3,
      aluno: 'Pedro Miguel Santos',
      responsavel: 'Juliana Santos',
      escola: 'Escola Estadual Monteiro Lobato',
      vencimento: 'Rua das Acácias, 89 - Vila Verde',
      valor: 'Van 01',
      status: 'Em atraso',
    },
    {
      id: 4,
      aluno: 'Laura Fernanda Alves',
      responsavel: 'Ricardo Alves',
      escola: 'Colégio Adventista Central',
      vencimento: 'Rua dos Pinheiros, 777 - Jardim Sul',
      valor: 'Van 03',
      status: 'Cancelado',
    },
    {
      id: 5,
      aluno: 'Gabriel Eduardo Rocha',
      responsavel: 'Patrícia Rocha',
      escola: 'Escola Municipal Paulo Freire',
      vencimento: 'Av. Independência, 1020 - Centro',
      valor: 'Van 02',
      status: 'Pendente',
    },
  ];

  alunosFiltrados = [...this.alunos];

  filtroAtivo: Filtro | '' = '';
  valoresFiltro: string[] = [];

  trocarFiltroAtivo(event: any) {
    this.filtroAtivo = event.detail.value;

    this.gerarFiltros();
  }

  gerarFiltros() {
    if (!this.filtroAtivo) return;

    this.valoresFiltro = [
      ...new Set(this.alunos.map((a) => a[this.filtroAtivo as Filtro])),
    ];
  }

  filtrar(event: any) {
    if (!this.filtroAtivo) {
      return;
    }

    const valor = event.detail.value;
    this.alunosFiltrados = this.alunos.filter(
      (a) => (a as any)[this.filtroAtivo] === valor
    );
  }

  pesquisarAluno(event: any) {
    const valor = event.detail.value.toLowerCase();

    let base = this.alunos;

    if (this.filtroAtivo) {
      base = this.alunos.filter(
        (a) => (a as any)[this.filtroAtivo] !== undefined
      );
    }

    this.alunosFiltrados = base.filter((a) =>
      a.aluno.toLowerCase().includes(valor)
    );
  }

  limparFiltros() {
    this.filtroAtivo = '';
    this.valoresFiltro = [];
  }
}
