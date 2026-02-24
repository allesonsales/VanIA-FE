import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../../service/usuario.service';
import { FlashMessageService } from '../../../service/flash-message.service';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private flashMesssage: FlashMessageService,
  ) {}
  menuAberto = false;
  isHome = false;

  private routerSub!: Subscription;

  ngOnInit(): void {
    this.isHome = this.router.url === '/dashboard';

    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = event.urlAfterRedirects === '/dashboard';
      }
    });
  }

  sair() {
    this.usuarioService.sair().subscribe({
      next: (res: any) => {
        this.flashMesssage.show(res.message, res.status);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  irParaHome() {
    this.router.navigate(['/dashboard']);
  }
  irParaAlunos() {
    this.router.navigate(['/alunos']);
  }

  irParaEscolas() {
    this.router.navigate(['/escolas']);
  }

  irParaMotoristas() {
    this.router.navigate(['/motoristas']);
  }
  irParaVans() {
    this.router.navigate(['/vans']);
  }
  irParaViagens() {
    this.router.navigate(['/viagens']);
  }
  irParaFinanceiro() {
    this.router.navigate(['/financeiro']);
  }
}
