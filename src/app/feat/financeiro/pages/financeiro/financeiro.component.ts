import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { CardValorComponent } from '../../components/card-valor/card-valor.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CalendarioComponent } from '../../../../shared/components/calendario/calendario.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FinanceiroService } from '../../../../service/financeiro.service';
import { Pagamento } from '../../../../../types/Pagamento';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-financeiro',
  imports: [
    TabelaComponent,
    CardValorComponent,
    ButtonComponent,
    CalendarioComponent,
    HeaderComponent,
    LoadingComponent,
  ],
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.css',
})
export class FinanceiroComponent implements OnInit {
  constructor(
    private financeiroService: FinanceiroService,
    private flashMessage: FlashMessageService,
  ) {}
  mesSelecionado = 0;
  anoSelecionado = 0;
  pagamentos: Pagamento[] = [];
  estimativa: number = 0;
  recebido: number = 0;
  atrasado: number = 0;
  loading: boolean = false;

  ngOnInit(): void {
    document.title = 'VanIA | Financeiro';
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();
    this.loading = true;

    this.financeiroService.buscarTodosPagamentos(mesAtual, anoAtual).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.pagamentos = res.listaPagamento;
        this.estimativa = res.estimativa;
        this.recebido = res.recebido;
        this.atrasado = res.atrasado;
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
        console.log(err);
      },
    });
  }

  onCalendarioChange(data: { mes: number; ano: number }) {
    this.mesSelecionado = data.mes;
    this.anoSelecionado = data.ano;

    this.buscarPagamentoDoMes(this.mesSelecionado, this.anoSelecionado);
  }

  buscarPagamentoDoMes(mes: number, ano: number) {
    this.loading = true;

    this.financeiroService.buscarTodosPagamentos(mes, ano).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.pagamentos = res.listaPagamento;
        this.estimativa = res.estimativa;
        this.recebido = res.recebido;
        this.atrasado = res.atrasado;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
