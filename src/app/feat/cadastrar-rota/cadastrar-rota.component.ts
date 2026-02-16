import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import buscarCep from '../../shared/utils/buscarCep';
import { Endereco } from '../../../types/Endereco';
import { NgxMaskDirective } from 'ngx-mask';
import { EnderecoViaCep } from '../../../types/EnderecoViaCep';
import { FlashMessageService } from '../../service/flash-message.service';
import { RotaService } from '../../service/rota.service';
import validarHorarioIdaOuVolta from '../../shared/utils/validarHorarioIdaOuVolta';
import { Motorista } from '../../../types/Motorista';
import { Van } from '../../../types/Van';
import { Escola } from '../../../types/Escola';
import { VanService } from '../../service/van.service';
import { MotoristaService } from '../../service/motorista.service';
import { EscolaService } from '../../service/escola.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-rota',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './cadastrar-rota.component.html',
  styleUrl: './cadastrar-rota.component.css',
})
export class CadastrarRotaComponent implements OnInit {
  formRota!: FormGroup;
  loading = false;
  endereco: EnderecoViaCep | null = null;
  motoristas: Motorista[] = [];
  vans: Van[] = [];
  escolas: Escola[] = [];

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
    private vanService: VanService,
    private motoristaService: MotoristaService,
    private escolaService: EscolaService,
    private rotaService: RotaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formRota = this.fb.group({
      vanId: ['', Validators.required],
      motoristaId: ['', Validators.required],
      escolaId: ['', Validators.required],
      horaInicioIda: ['', Validators.required],
      horaInicioVolta: ['', Validators.required],
      horaFimIda: ['', Validators.required],
      horaFimVolta: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    document.title = 'VanIA | Cadastrar rota';

    this.vanService.buscarVans().subscribe({
      next: (res: any) => {
        this.vans = res;
        console.log(res);
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });

    this.escolaService.buscarEscolas().subscribe({
      next: (res: any) => {
        this.escolas = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.motoristaService.buscarMotoristas().subscribe({
      next: (res: any) => {
        this.motoristas = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async buscarEndereco() {
    this.loading = true;
    let cepDigitado = this.formRota.get('cep')?.value;
    this.endereco = await buscarCep(cepDigitado);

    if (this.endereco == null) {
      this.loading = false;
      return;
    }

    if (this.endereco) {
      this.loading = false;
      this.formRota.get('rua')?.setValue(this.endereco.logradouro);
      this.formRota.get('bairro')?.setValue(this.endereco.bairro);
      this.formRota.get('cidade')?.setValue(this.endereco.localidade);
      this.formRota.get('estado')?.setValue(this.endereco.uf);
    }
  }

  async validarFormulario() {
    this.loading = true;
    const horaInicioIda = this.formRota.get('horaInicioIda')?.value;
    const horaFimIda = this.formRota.get('horaFimIda')?.value;
    const horaInicioVolta = this.formRota.get('horaInicioVolta')?.value;
    const horaFimVolta = this.formRota.get('horaFimVolta')?.value;
    const cep = this.formRota.get('cep')?.value;
    const rua = this.formRota.get('rua')?.value;
    const bairro = this.formRota.get('bairro')?.value;
    const cidade = this.formRota.get('cidade')?.value;
    const estado = this.formRota.get('estado')?.value;

    if (this.formRota.invalid) {
      this.loading = false;
      this.flashMessage.show('Preencha todos os campos!', 'error');
      return;
    }

    const validarHorarioIda = await validarHorarioIdaOuVolta(
      horaInicioIda,
      horaFimIda,
    );
    const validarHorarioVolta = await validarHorarioIdaOuVolta(
      horaInicioVolta,
      horaFimVolta,
    );

    if (validarHorarioIda.valido === false) {
      this.loading = false;
      this.flashMessage.show(
        'O horário de início da ida deve ser menor que o horário final.',
        'error',
      );
      return;
    }

    if (validarHorarioVolta.valido == false) {
      this.loading = false;
      this.flashMessage.show(
        'O horário de início da volta deve ser menor que o horário final.',
        'error',
      );
      return;
    }

    const payload = this.formRota.value;

    console.log(payload);

    this.rotaService.cadastrarRotas(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.router.navigate(['/rotas']);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
