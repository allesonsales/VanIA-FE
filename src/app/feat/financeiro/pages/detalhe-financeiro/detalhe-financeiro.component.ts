import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Pagamento } from '../../../../../types/Pagamento';
import { FinanceiroService } from '../../../../service/financeiro.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { mapearPagamentoEnum } from '../../../../shared/utils/mapearEnumPagamento';
import { Responsavel } from '../../../../../types/Responsavel';
import { AlunoFinanceiro } from '../../../../../types/Aluno';
import { CalendarioComponent } from '../../../../shared/components/calendario/calendario.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { FlashMessageService } from '../../../../service/flash-message.service';

@Component({
  selector: 'app-detalhe-financeiro',
  imports: [
    HeaderComponent,
    CommonModule,
    IonicModule,
    CalendarioComponent,
    LoadingComponent,
  ],
  templateUrl: './detalhe-financeiro.component.html',
  styleUrl: './detalhe-financeiro.component.css',
})
export class DetalheFinanceiroComponent implements OnInit {
  constructor(
    private financeiroService: FinanceiroService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessageService,
  ) {}
  pagamentoOriginal: Pagamento[] = [];
  pagamentos: Pagamento[] = [];
  pagamentosBase: Pagamento[] = [];
  valorMensalidade: number = 0;
  dataVencimento: number = 0;
  responsavel!: Responsavel;
  aluno!: AlunoFinanceiro;
  loading: boolean = false;
  mesSelecionado: string = '';

  ngOnInit(): void {
    document.title = `VanIA | Financeiro`;
    this.buscarPagamentos();
  }

  buscarPagamentos() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.financeiroService.buscarPagamentosPorIdResponsavel(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.pagamentoOriginal = res.map((pagamento: any) => ({
          ...pagamento,
          statusLabel: mapearPagamentoEnum(pagamento.status),
        }));
        this.pagamentos = this.pagamentoOriginal;
        this.pagamentosBase = this.pagamentoOriginal;
        this.responsavel = res[0].responsavel;
        this.aluno = res[0].aluno;
        this.valorMensalidade = res[0].valor;
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
        console.log(err);
      },
    });
  }

  aoSelecionarMes(evento: { mes: number; ano: number }) {
    const mesFormatado = evento.mes.toString().padStart(2, '0');
    this.mesSelecionado = `${evento.ano}-${mesFormatado}`;

    this.filtrarPagamento();
    console.log(this.pagamentos);
  }

  filtrarPagamento() {
    if (!this.mesSelecionado) {
      this.pagamentos = this.pagamentoOriginal;
      return;
    }

    this.pagamentos = this.pagamentoOriginal.filter(
      (pagamento) => pagamento.vencimento.slice(0, 7) === this.mesSelecionado,
    );
  }

  limparFiltro() {
    this.pagamentos = this.pagamentoOriginal;
    this.mesSelecionado = '';
  }

  mensagemResponsavel() {
    window.open(`https://wa.me/55${this.responsavel.telefone}`, '_blank');
  }

  abrirModalEditar() {}
  abrirModalDeletar() {}

  fecharModalDeletar() {}

  confirmarPagamento(id: number) {
    this.loading = true;
    const data = new Date().toLocaleDateString('en-CA');

    console.log(id);

    const payload = {
      status: 2,
      pago_em: data,
    };

    this.financeiroService.confirmarPagamento(id, payload).subscribe({
      next: (res: any) => {
        this.flashMessage.show(res.message, res.status);
        this.loading = false;
        this.buscarPagamentos();
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
        this.loading = false;
      },
    });
  }

  removerPagamento(id: number) {
    this.loading = true;

    console.log(id);

    const payload = {
      status: 1,
    };

    this.financeiroService.cancelarPagamento(id, payload).subscribe({
      next: (res: any) => {
        this.flashMessage.show(res.message, res.status);
        this.loading = false;
        this.buscarPagamentos();
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
        this.loading = false;
        this.buscarPagamentos();
      },
    });
  }
}
