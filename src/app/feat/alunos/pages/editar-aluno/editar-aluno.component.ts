import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Aluno } from '../../../../../types/Aluno';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import buscarCep from '../../../../shared/utils/buscarCep';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { RotaService } from '../../../../service/rota.service';
import { Escola } from '../../../../../types/Escola';
import { Rota } from '../../../../../types/Rotas';
import { EscolaService } from '../../../../service/escola.service';
import { AlunoService } from '../../../../service/aluno.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-aluno',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './editar-aluno.component.html',
  styleUrl: './editar-aluno.component.css',
})
export class EditarAlunoComponent implements OnInit, OnChanges {
  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
    private rotaService: RotaService,
    private escolaService: EscolaService,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
  ) {}

  @Input() aluno: Aluno | null = null;
  @Input() abrirModal: boolean = false;
  @Output() fecharModal = new EventEmitter<void>();

  formAluno!: FormGroup;
  loading: boolean = false;
  escolas: Escola[] = [];
  rotas: Rota[] = [];

  ngOnInit(): void {
    document.title = 'VanIA | Alunos';
    this.formAluno = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      rg: ['', Validators.required],
      tipoSanguineo: [''],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      escolaId: ['', Validators.required],
      turno: ['', Validators.required],
      rotaId: ['', Validators.required],
      nomeResponsavel: ['', Validators.required],
      cpfResponsavel: ['', Validators.required],
      telefoneResponsavel: ['', Validators.required],
      emailResponsavel: ['', Validators.required],
      valorMensalidade: ['', Validators.required],
      diaVencimento: ['', Validators.required],
      responsavelId: ['', Validators.required],
    });

    this.buscarRotas();
    this.buscarEscolas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aluno'] && this.aluno && this.formAluno) {
      const turno = this.aluno.rota?.hora_fim_volta
        ? (() => {
            const hora = parseInt(
              this.aluno.rota.hora_fim_volta.split(':')[0],
              10,
            );

            if (hora < 12) return 'Manhã';
            if (hora < 18) return 'Tarde';
            return 'Noite';
          })()
        : null;

      this.formAluno.patchValue({
        nome: this.aluno.nome,
        dataNascimento: this.aluno.data_nascimento.split('T')[0],
        rg: this.aluno.rg,
        tipoSanguineo: this.aluno.tipo_sanguineo,
        cep: this.aluno.endereco.cep,
        rua: this.aluno.endereco.rua,
        numero: this.aluno.endereco.numero,
        bairro: this.aluno.endereco.bairro,
        cidade: this.aluno.endereco.cidade,
        estado: this.aluno.endereco.estado,
        escolaId: this.aluno.escola.id,
        turno: turno,
        nomeResponsavel: this.aluno.responsavel.nome,
        cpfResponsavel: this.aluno.responsavel.cpf,
        telefoneResponsavel: this.aluno.responsavel.telefone,
        emailResponsavel: this.aluno.responsavel.email,
        responsavelId: this.aluno.responsavel.id,
      });

      if (turno && this.aluno.escola.id) {
        this.buscarRotas();
      }
    }
  }

  atualizarAluno() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const payload = this.formAluno.value;

    console.log(payload);

    this.alunoService.atualizarAluno(id, payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  async validarEndereco() {
    const cep = this.formAluno.get('cep')?.value;
    if (!cep || cep == '' || cep.length < 8) return;

    this.loading = true;

    const endereco = await buscarCep(cep);

    if (endereco === null) {
      this.loading = false;
      return;
    }

    if (endereco) {
      this.loading = false;
      this.formAluno.get('rua')?.setValue(endereco.logradouro);
      this.formAluno.get('bairro')?.setValue(endereco.bairro);
      this.formAluno.get('cidade')?.setValue(endereco.localidade);
      this.formAluno.get('estado')?.setValue(endereco.uf);
    }
  }

  buscarRotas() {
    const turno = this.formAluno.get('turno')?.value;
    const escolaId = this.formAluno.get('escolaId')?.value;
    this.formAluno.get('rotaId')?.reset();

    if (!turno || !escolaId) return;

    this.loading = true;

    this.rotaService.buscarRotaPorTurnoeEscola({ turno, escolaId }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.rotas = res;

        if (this.aluno?.rota?.id) {
          const rotaExiste = res.find(
            (r: any) => r.id === this.aluno!.rota!.id,
          );

          if (rotaExiste) {
            this.formAluno.get('rotaId')?.setValue(this.aluno.rota.id);
          }
        }

        if (res.length === 0) {
          this.flashMessage.show(
            'Nenhuma rota cadastrada para essa escola neste turno!',
            'error',
          );
        }
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  buscarEscolas() {
    this.escolaService.buscarEscolas().subscribe({
      next: (res: any) => {
        this.escolas = res;

        if (this.aluno?.escola.id) {
          const escolaExiste = res.find(
            (escola: any) => escola.id === this.aluno?.escola.id,
          );

          if (escolaExiste) {
            this.formAluno.get('escolaId')?.setValue(this.aluno.escola.id);
          }
        }

        if (res.length === 0) {
          this.flashMessage.show(
            'Nenhuma rota cadastrada para essa escola neste turno!',
            'error',
          );
        }
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  fechar() {
    this.fecharModal.emit();
  }
}
