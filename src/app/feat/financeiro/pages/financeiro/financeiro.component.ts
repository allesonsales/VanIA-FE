import { Component } from '@angular/core';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { CardValorComponent } from '../../components/card-valor/card-valor.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CalendarioComponent } from '../../../../shared/components/calendario/calendario.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-financeiro',
  imports: [
    TabelaComponent,
    CardValorComponent,
    ButtonComponent,
    CalendarioComponent,
    HeaderComponent,
  ],
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.css',
})
export class FinanceiroComponent {
  mesSelecionado = '';

  onMesChange(event: any) {
    this.mesSelecionado = event.detail.value;
  }
}
