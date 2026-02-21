import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TipoEscola } from '../../../types/Escola';
import { EscolaService } from '../../service/escola.service';
import { CommonModule } from '@angular/common';
import { FlashMessageService } from '../../service/flash-message.service';
import { NgxMaskDirective } from 'ngx-mask';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import buscarCep from '../../shared/utils/buscarCep';
import { EnderecoViaCep } from '../../../types/EnderecoViaCep';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-escola',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    LoadingComponent,
  ],
  templateUrl: './cadastrar-escola.component.html',
  styleUrl: './cadastrar-escola.component.css',
})
export class CadastrarEscolaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private escolaService: EscolaService,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {}

  formEscola!: FormGroup;
  tiposEscola: TipoEscola[] = [];
  endereco: EnderecoViaCep | null = null;
  loading = false;

  ngOnInit(): void {
    document.title = 'VanIA | Cadastrar escola';

    this.formEscola = this.fb.group({
      nome: ['', Validators.required],
      telefone: [''],
      tipo: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.escolaService.buscarTipos().subscribe({
      next: (res) => {
        console.log(res);
        this.tiposEscola = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async buscarCep() {
    this.loading = true;

    const cepDigitado = this.formEscola.get('cep')?.value;

    this.endereco = await buscarCep(cepDigitado);

    if (this.endereco == null) {
      this.loading = false;
      return;
    }

    if (this.endereco) {
      this.loading = false;
      this.formEscola.get('rua')?.setValue(this.endereco.logradouro);
      this.formEscola.get('bairro')?.setValue(this.endereco.bairro);
      this.formEscola.get('cidade')?.setValue(this.endereco.localidade);
      this.formEscola.get('estado')?.setValue(this.endereco.uf);
    }
  }

  validarFormulario() {
    if (this.formEscola.invalid) {
      this.flashMessage.show('Preencha todos os campos obrigatórios', 'error');
      return;
    }
    this.loading = true;

    const payload = this.formEscola.value;

    this.escolaService.cadastrarEscola(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.formEscola.reset();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
