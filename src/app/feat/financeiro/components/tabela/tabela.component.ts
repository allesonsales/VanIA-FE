import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Pagamento } from '../../../../../types/Pagamento';
import { mapearPagamentoEnum } from '../../../../shared/utils/mapearEnumPagamento';
import { Router } from '@angular/router';
import { map } from 'rxjs';

type Filtro = 'Escola' | 'Status';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  constructor(private router: Router) {}
  @Input() pagamentos!: Pagamento[];

  filtroAtivo: Filtro | '' = '';
  valoresFiltro: string[] = [];
  pagamentosBase: Pagamento[] = [];
  pagamentosFiltrados: Pagamento[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pagamentos'] && this.pagamentos) {
      this.pagamentosBase = this.pagamentos.map((pagamento) => ({
        ...pagamento,
        statusLabel: mapearPagamentoEnum(pagamento.status),
      }));
      this.pagamentosFiltrados = [...this.pagamentosBase];
    }
  }

  trocarFiltroAtivo(event: any) {
    this.filtroAtivo = event.detail.value as Filtro;

    this.gerarFiltros();

    console.log(this.valoresFiltro);
  }

  gerarFiltros() {
    if (this.filtroAtivo === 'Status') {
      this.valoresFiltro = ['Pago', 'Pendente', 'Vencido'];
    }

    if (this.filtroAtivo === 'Escola') {
      this.valoresFiltro = Array.from(
        new Set(this.pagamentos.map((p) => p.aluno.escola.nome)),
      );
    }
  }

  filtrar(event: any) {
    const valor = event.detail.value;

    if (!this.filtroAtivo) return;

    this.pagamentosFiltrados = this.pagamentosBase.filter((pagamento) => {
      if (this.filtroAtivo === 'Escola') {
        return pagamento.aluno.escola.nome === valor;
      }

      if (this.filtroAtivo === 'Status') {
        return pagamento.statusLabel.label === valor;
      }

      return true;
    });
  }

  pesquisarAluno(event: any) {
    console.log('Pesquiando');
    const valor = event.detail.value?.toLowerCase() ?? '';

    const base = this.filtroAtivo
      ? this.pagamentosFiltrados
      : this.pagamentosBase;

    this.pagamentosFiltrados = base.filter((pagamento) =>
      pagamento?.aluno.nome.toLowerCase().includes(valor),
    );
  }

  limparFiltros() {
    this.filtroAtivo = '';
    this.valoresFiltro = [];
  }

  consultarPagamento(id: number) {
    this.router.navigate([`/financeiro/${id}`]);
  }
}
