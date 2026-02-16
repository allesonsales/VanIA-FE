import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Rota } from '../../../../../types/Rotas';
import { ActivatedRoute, Router } from '@angular/router';
import { RotaService } from '../../../../service/rota.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { IonicModule } from '@ionic/angular';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';
import { EditarRotaComponent } from '../editar-rota/editar-rota.component';
import { FlashMessageService } from '../../../../service/flash-message.service';

@Component({
  selector: 'app-detalhe-rota',
  imports: [
    HeaderComponent,
    LoadingComponent,
    IonicModule,
    ModalDeleteComponent,
    EditarRotaComponent,
  ],
  templateUrl: './detalhe-rota.component.html',
  styleUrl: './detalhe-rota.component.css',
})
export class DetalheRotaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rotaService: RotaService,
    private flashMessage: FlashMessageService,
  ) {}

  rota: Rota | null = null;
  loading = false;
  abrirEdicao = false;
  abrirDeletar = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Chamou');

    this.loading = true;

    this.rotaService.buscarRota(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.rota = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  abrirModalDeletar() {
    this.abrirDeletar = true;
  }

  fecharModalDeletar() {
    this.abrirDeletar = false;
  }

  abrirModalEdicao() {
    this.abrirEdicao = true;
  }

  fecharModalEdicao() {
    this.abrirEdicao = false;
  }

  deletarRota() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    this.rotaService.deletarRota(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.router.navigate(['/rotas']);
        this.flashMessage.show(res.message, res.status);
      },
      error: (err: any) => {
        this.loading = false;
        console.log(err);
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
