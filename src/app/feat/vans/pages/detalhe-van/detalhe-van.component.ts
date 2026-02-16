import { Component, Input, OnInit } from '@angular/core';
import { VanService } from '../../../../service/van.service';
import { Van } from '../../../../../types/Van';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { EditarVanComponent } from '../editar-van/editar-van.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { PlacaPipe } from '../../../../../types/pipes/Placa-pipe';

@Component({
  selector: 'app-detalhe-van',
  imports: [
    HeaderComponent,
    IonicModule,
    ModalDeleteComponent,
    EditarVanComponent,
    LoadingComponent,
    PlacaPipe,
  ],
  templateUrl: './detalhe-van.component.html',
  styleUrl: './detalhe-van.component.css',
})
export class DetalheVanComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private vanService: VanService,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {}
  loading: boolean = false;
  van: Van | null = null;
  totalAlunos: number | null = null;
  abrirDeletar: boolean = false;
  abrirEditar: boolean = false;
  id: number | null = null;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    document.title = 'VanIA | Vans';

    this.vanService.buscarVan(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.van = res.vanEncontrada;
        this.totalAlunos = res.totalAlunos;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  abrirModalDeletar() {
    this.abrirDeletar = true;
  }

  fecharModal() {
    this.abrirDeletar = false;
  }

  fecharModalEdicao() {
    this.abrirEditar = false;
  }

  abrirModalEdicao() {
    this.abrirEditar = true;
  }

  deletarVan() {
    this.loading = true;
    this.vanService.deletarVan(this.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.router.navigate(['/vans']);
        this.fecharModal();
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
        this.fecharModal();
      },
    });
  }
}
