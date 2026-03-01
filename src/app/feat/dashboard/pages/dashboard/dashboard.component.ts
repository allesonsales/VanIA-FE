import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FinanceiroService } from '../../../../service/financeiro.service';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { CardNumerosComponent } from '../../components/card-numeros/card-numeros.component';
import { NumerosDash } from '../../../../../types/NumerosDashboard';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, ButtonComponent, CardNumerosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private financeiroService: FinanceiroService,
    private flashMessage: FlashMessageService,
    private usuarioService: UsuarioService,
  ) {}

  dadosCard: NumerosDash = {
    totalEscolas: 0,
    totalVencidos: 0,
    totalAlunos: 0,
    totalVans: 0,
  };

  totalVencidos: number | null = null;
  totalAlunos: number | null = null;

  ngOnInit(): void {
    document.title = 'VanIA- Seu meio de transporte!';

    this.usuarioService.buscarUsuario().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dadosCard = {
          totalEscolas: res.total_escolas,
          totalVencidos: res.total_vencidos,
          totalVans: res.total_vans,
          totalAlunos: res.total_alunos,
        };
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
