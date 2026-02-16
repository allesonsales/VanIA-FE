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
  ) {}

  formEscola!: FormGroup;
  tiposEscola: TipoEscola[] = [];
  loading = false;

  ngOnInit(): void {
    document.title = 'Cadastrar escola';

    this.formEscola = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
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
    const cep = this.formEscola.get('cep')?.value;

    if (cep.split('').length < 8) return;

    this.loading = true;

    fetch(`http://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        this.loading = false;
        console.log(data);
        this.formEscola.get('rua')?.setValue(data.logradouro);
        this.formEscola.get('bairro')?.setValue(data.bairro);
        this.formEscola.get('cidade')?.setValue(data.localidade);
        this.formEscola.get('estado')?.setValue(data.uf);
      })
      .catch((error) => console.log(error));
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
