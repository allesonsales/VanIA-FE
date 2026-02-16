import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsuarioService } from '../../../../service/usuario.service';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  menuAberto: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private flashmessage: FlashMessageService,
    private router: Router,
  ) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  sair() {
    this.usuarioService.sair().subscribe({
      next: (res: any) => {
        this.flashmessage.show(res.message, res.status);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.flashmessage.show(err.error.message, err.error.status);
      },
    });
  }
}
