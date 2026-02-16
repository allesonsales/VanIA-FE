import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Responsavel } from '../../../types/Responsavel';
import { RotaService } from '../../service/rota.service';
import { EscolaService } from '../../service/escola.service';
import { Escola } from '../../../types/Escola';
import { FlashMessageService } from '../../service/flash-message.service';
import buscarCep from '../../shared/utils/buscarCep';
import { NgxMaskDirective } from 'ngx-mask';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Rota } from '../../../types/Rotas';
import { AlunoService } from '../../service/aluno.service';

@Component({
  selector: 'app-cadastrar-aluno',
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    LoadingComponent,
  ],
  templateUrl: './cadastrar-aluno.component.html',
  styleUrl: './cadastrar-aluno.component.css',
})
export class CadastrarAlunoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
    private rotaService: RotaService,
    private escolaService: EscolaService,
    private alunoService: AlunoService,
  ) {}

  escolas: Escola[] = [];
  rotas: Rota[] = [];
  formAluno!: FormGroup;
  loading = false;

  ngOnInit(): void {
    this.formAluno = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      rg: ['', Validators.required],
      tipoSanguineo: [''],
      nomeResponsavel: ['', Validators.required],
      cpfResponsavel: ['', Validators.required],
      telefoneResponsavel: ['', Validators.required],
      emailResponsavel: ['', Validators.required],
      escolaId: ['', Validators.required],
      turno: ['', Validators.required],
      rotaId: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      valorMensalidade: ['', Validators.required],
      tempoContrato: ['', Validators.required],
      diaVencimento: ['', Validators.required],
    });

    this.escolaService.buscarEscolas().subscribe({
      next: (res: any) => {
        this.escolas = res;
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  selecionarEscola(escolaId: number) {}

  async validarEndereco() {
    const cep = this.formAluno.get('cep')?.value;
    if (!cep || cep == '' || cep.length < 8) return;

    this.loading = true;

    const endereco = await buscarCep(cep);

    this.loading = false;

    this.formAluno.get('rua')?.setValue(endereco.logradouro);
    this.formAluno.get('bairro')?.setValue(endereco.bairro);
    this.formAluno.get('cidade')?.setValue(endereco.localidade);
    this.formAluno.get('estado')?.setValue(endereco.uf);
  }

  buscarRotas() {
    const turno = this.formAluno.get('turno')?.value;
    const escolaId = this.formAluno.get('escolaId')?.value;

    const payload = { turno, escolaId };

    if (!turno || !escolaId) return;

    this.loading = true;

    this.rotaService.buscarRotaPorTurnoeEscola(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.rotas = res;

        if (res.length == 0) {
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

  validarFormulario() {
    const payload = this.formAluno.value;
    console.log(payload);
    this.loading = true;
    const dataAtual = new Date();
    const nome = this.formAluno.get('nome')?.value;
    const dataNascimento = new Date(
      this.formAluno.get('dataNascimento')?.value,
    );
    const diaVencimento = this.formAluno.get('diaVencimento')?.value;

    if (dataAtual < dataNascimento) {
      this.flashMessage.show('Insira uma data de nascimento válida!', 'error');
      this.loading = false;
      return;
    }

    if (nome == '') {
      this.loading = false;
      this.flashMessage.show('Preencha o nome!', 'error');
      return;
    }

    if (dataNascimento == null) {
      this.loading = false;
      this.flashMessage.show('Preencha o nome!', 'error');
      return;
    }

    if (diaVencimento < 1 || diaVencimento > 31) {
      this.loading = false;
      this.flashMessage.show('Insira um dia de vencimento válido!', 'error');
      return;
    }

    if (this.formAluno.invalid) {
      this.loading = false;
      this.formAluno.markAllAsTouched();
      this.flashMessage.show(
        'Preencha os campos obrigatórios do formulário!',
        'error',
      );
      return;
    }

    this.alunoService.cadastrarAluno(payload).subscribe({
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
}
