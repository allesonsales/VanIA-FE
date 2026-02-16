import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Aluno } from '../../../../../types/Aluno';
import { Router } from '@angular/router';
import { mapearStatusAluno } from '../../../../shared/utils/mapearEnumStatusAluno';
import { TelefonePipe } from '../../../../../types/pipes/Telefone-Pipe';

type Filtro = 'escola' | 'status' | 'van';

interface FiltroOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  constructor(private router: Router) {}

  @Input() alunos!: Aluno[];

  alunosBase: Aluno[] = [];
  alunosFiltrados: Aluno[] = [];
  valoresFiltro: FiltroOption[] = [];
  filtroAtivo: Filtro | '' = '';

  ngOnChanges(): void {
    if (!this.alunos?.length) return;

    this.alunosBase = this.alunos;

    this.alunosBase = this.alunos.map((aluno) => ({
      ...aluno,
      statusLabel: mapearStatusAluno(aluno.status),
    }));

    this.alunosFiltrados = [...this.alunosBase];
  }

  trocarFiltroAtivo(event: any) {
    this.filtroAtivo = event.detail.value;
    this.gerarValoresFiltro();
  }

  gerarValoresFiltro() {
    if (!this.filtroAtivo) return;

    if (this.filtroAtivo === 'escola') {
      this.valoresFiltro = Array.from(
        new Map(
          this.alunosBase
            .filter((a) => a.escola)
            .map((a) => [
              a.escola!.id,
              { label: a.escola!.nome, value: a.escola!.id },
            ]),
        ).values(),
      );
    }

    if (this.filtroAtivo === 'van') {
      this.valoresFiltro = Array.from(
        new Map(
          this.alunosBase
            .filter((a) => a.van)
            .map((a) => [
              a.van!.id,
              {
                label: a.van!.modelo ?? 'Sem modelo',
                value: a?.van?.id,
              },
            ]),
        ).values(),
      );
    }

    if (this.filtroAtivo === 'status') {
      this.valoresFiltro = Array.from(
        new Map(
          this.alunosBase.map((a) => {
            const statusMapeado = mapearStatusAluno(a?.status);

            return [
              a.status,
              {
                label: statusMapeado?.label ?? 'Sem status',
                value: a.status,
              },
            ];
          }),
        ).values(),
      );
    }
  }

  filtrar(event: any) {
    const valor = event.detail.value;
    console.log(valor);
    if (!this.filtroAtivo) return;

    this.alunosFiltrados = this.alunosBase.filter((aluno) => {
      if (this.filtroAtivo === 'escola') {
        return aluno.escola?.id === valor;
      }

      if (this.filtroAtivo === 'van') {
        return aluno.van?.id === valor;
      }

      if (this.filtroAtivo === 'status') {
        return aluno.status === valor;
      }

      return true;
    });
  }

  pesquisarAluno(event: any) {
    console.log('filtrando');
    const valor = event.detail.value?.toLowerCase() ?? '';

    const base = this.filtroAtivo ? this.alunosFiltrados : this.alunosBase;

    this.alunosFiltrados = base.filter((aluno) =>
      aluno?.nome?.toLowerCase().includes(valor),
    );
  }

  limparFiltros() {
    this.filtroAtivo = '';
    this.valoresFiltro = [];
    this.alunosFiltrados = [...this.alunosBase];
  }

  consultarAluno(id: number) {
    this.router.navigate([`/alunos/${id}`]);
  }
}
