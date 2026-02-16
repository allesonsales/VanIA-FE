import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoristaService } from '../../../../service/motorista.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Motorista } from '../../../../../types/Motorista';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';
import { EditarMotoristaComponent } from '../editar-motorista/editar-motorista.component';

@Component({
  selector: 'app-detalhe-motorista',
  imports: [
    HeaderComponent,
    IonicModule,
    CommonModule,
    ModalDeleteComponent,
    EditarMotoristaComponent,
  ],
  templateUrl: './detalhe-motorista.component.html',
  styleUrl: './detalhe-motorista.component.css',
})
export class DetalheMotoristaComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private flashMessage: FlashMessageService,
  ) {}

  motorista: Motorista | null = null;
  abrirEditar: boolean = false;
  abrirDeletar: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.motoristaService.buscarMotorista(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.motorista = res;
      },
      error: (err) => {
        console.log(err);
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  abrirModalEditar() {
    this.abrirEditar = true;
  }

  fecharModalEditar() {
    this.abrirEditar = false;
  }

  abrirModalDeletar() {
    this.abrirDeletar = true;
  }

  fecharModalDeletar() {
    this.abrirDeletar = false;
  }

  ligarParaMotorista() {
    window.open(`https://wa.me/55${this.motorista?.telefone}`, '_blank');
  }

  excluirMotorista() {
    this.loading = true;
    this.motoristaService
      .excluirMotorista(Number(this.motorista?.id))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
          this.flashMessage.show(res.message, res.status);
          this.router.navigate(['/motoristas']);
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.flashMessage.show(err.error.message, err.error.status);
        },
      });
  }
}
