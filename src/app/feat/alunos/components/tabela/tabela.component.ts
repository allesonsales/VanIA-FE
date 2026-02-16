import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Aluno } from '../../../../../types/Aluno';

type Filtro = 'escola' | 'status' | 'van';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Input() alunos!: Aluno[];
  alunosFiltrados: Aluno[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.alunos) return;

    this.alunosFiltrados = this.alunos;
  }

  filtroAtivo: Filtro | '' = '';
  valoresFiltro: string[] = [];

  trocarFiltroAtivo(event: any) {
    this.filtroAtivo = event.detail.value;
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
    const valor = event.detail.value;

    this.alunosFiltrados = this.alunos.filter((aluno) =>
      aluno.nome.includes(valor)
    );
  }

  limparFiltros() {
    this.filtroAtivo = '';
    this.valoresFiltro = [];
  }
}
