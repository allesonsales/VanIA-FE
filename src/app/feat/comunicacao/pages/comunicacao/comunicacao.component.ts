import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AlunoFinanceiro } from '../../../../../types/Aluno';

type Filtro = 'escola' | 'status' | 'vencimento';

@Component({
  selector: 'app-comunicacao',
  imports: [IonicModule, CommonModule],
  templateUrl: './comunicacao.component.html',
  styleUrl: './comunicacao.component.css',
})
export class ComunicacaoComponent {
  mostrarResultados = false;
  alunosSelecionados: AlunoFinanceiro[] = [];
  alunos = [
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
    {
      id: 6,
      aluno: 'Gabriela Eduardo Rocha',
      responsavel: 'Patrícia Rocha',
      escola: 'Escola Municipal Paulo Freire',
      vencimento: 'Av. Independência, 1020 - Centro',
      valor: 'Van 02',
      status: 'Pendente',
    },
  ];

  selecionados = [];
  filtroAtivo: Filtro | '' = '';
  filtrosAtivos: string[] = [];

  alunosFiltrados = [...this.alunos];

  pesquisarAluno(event: any) {
    const valor = event.target.value.toLowerCase();

    if (!valor) {
      this.mostrarResultados = false;
      this.alunosFiltrados = [];
      return;
    }

    this.alunosFiltrados = this.alunos.filter((a) =>
      a.aluno.toLowerCase().includes(valor),
    );

    this.mostrarResultados = true;
  }

  selecionarAluno(aluno: any) {
    const jaSelecionado = this.alunosSelecionados.some(
      (a: any) => a.id === aluno.id,
    );

    if (!jaSelecionado) {
      this.alunosSelecionados.push(aluno);
    }

    this.mostrarResultados = false;
  }

  filtrar(event: any) {
    this.filtroAtivo = event.target.value;
    this.gerarFiltro(this.filtroAtivo);
  }

  gerarFiltro(valor: any) {
    this.filtrosAtivos = [
      ...new Set(this.alunos.map((a) => a[this.filtroAtivo as Filtro])),
    ];
  }
}
