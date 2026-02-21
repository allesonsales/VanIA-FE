import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Escola } from '../../../../../types/Escola';
import { EscolaService } from '../../../../service/escola.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';
import { EditarEscolaComponent } from '../editar-escola/editar-escola.component';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { flash } from 'ionicons/icons';

@Component({
  selector: 'app-detalhe-escola',
  imports: [
    HeaderComponent,
    IonicModule,
    ModalDeleteComponent,
    EditarEscolaComponent,
  ],
  templateUrl: './detalhe-escola.component.html',
  styleUrl: './detalhe-escola.component.css',
})
export class DetalheEscolaComponent implements OnInit {
  @Input() escola: Escola | null = null;
  abrirDeletar = false;
  abrirModalEdicao = false;
  loading = false;

  constructor(
    private escolaService: EscolaService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {}

  totalAlunos: Number | null = null;
  totalRotas: Number | null = null;

  ngOnInit(): void {
    console.log('iniciou');
    document.title = `${this.escola?.nome}`;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.escolaService.buscarEscola(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.escola = res.escola;
        this.totalAlunos = res.totalAlunosPorEscola;
        this.totalRotas = res.totalRotasAtivas;
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  editarModal() {
    this.abrirModalEdicao = true;
  }

  fecharModalEdicao() {
    this.abrirModalEdicao = false;
  }

  perguntarDeletar() {
    this.abrirDeletar = true;
  }

  fecharModalDeletar() {
    this.abrirDeletar = false;
  }

  ligar() {
    window.open(`https://wa.me/55${this.escola?.telefone}`, '_blank');
  }

  deletarEscola() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.escolaService.deletarEscola(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.abrirDeletar = false;
        this.router.navigate([`/escolas`]);
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
        this.abrirDeletar = false;
      },
    });
  }
}
