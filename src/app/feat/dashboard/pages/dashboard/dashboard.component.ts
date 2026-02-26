import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FinanceiroService } from '../../../../service/financeiro.service';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { UsuarioService } from '../../../../service/usuario.service';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private financeiroService: FinanceiroService,
    private flashMessage: FlashMessageService,
    private usuarioService: UsuarioService,
  ) {}

  totalVencidos: number | null = null;
  totalAlunos: number | null = null;

  ngOnInit(): void {
    document.title = 'VanIA- Seu meio de transporte!';

    this.usuarioService.buscarUsuario().subscribe({
      next: (res: any) => {
        console.log(res);
        this.totalVencidos = res.totalVencidos;
        this.totalAlunos = res.totalAlunos;
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
