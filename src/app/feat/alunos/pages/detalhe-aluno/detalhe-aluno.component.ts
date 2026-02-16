import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoristaService } from '../../../../service/motorista.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Motorista } from '../../../../../types/Motorista';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';

import { EditarAlunoComponent } from '../editar-aluno/editar-aluno.component';
import { AlunoService } from '../../../../service/aluno.service';
import { Aluno } from '../../../../../types/Aluno';
import { TelefonePipe } from '../../../../../types/pipes/Telefone-Pipe';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-detalhe-aluno',
  imports: [
    HeaderComponent,
    IonicModule,
    CommonModule,
    ModalDeleteComponent,
    EditarAlunoComponent,
    TelefonePipe,
  ],
  templateUrl: './detalhe-aluno.component.html',
  styleUrl: './detalhe-aluno.component.css',
})
export class DetalheAlunoComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private flashMessage: FlashMessageService,
  ) {}

  aluno: Aluno | null = null;
  abrirEditar: boolean = false;
  abrirDeletar: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alunoService.buscarAluno(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.aluno = res;
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

  mensagemResponsavel() {
    window.open(
      `https://wa.me/55${this.aluno?.responsavel?.telefone}`,
      '_blank',
    );
  }

  verPagamentos() {
    this.router.navigate([`/financeiro/${this.aluno?.responsavel.id}`]);
  }

  excluirAluno() {
    this.loading = true;
    this.alunoService.excluirAluno(Number(this.aluno?.id)).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.flashMessage.show(res.message, res.status);
        this.router.navigate(['/alunos']);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  baixarContarto() {
    const nome = `${this.aluno?.id}-${this.aluno?.nome.replace(/\s+/g, '_')}.pdf`;
    window.open(`${environment.apiUrl}/contratos/${nome}`, '_blank');
  }
}
