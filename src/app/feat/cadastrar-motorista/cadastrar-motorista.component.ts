import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import verificarIdade from '../../shared/utils/verificarIdade';
import { FlashMessageService } from '../../service/flash-message.service';
import { flash } from 'ionicons/icons';
import { MotoristaService } from '../../service/motorista.service';
import verificarValidadeCnh from '../../shared/utils/verificarValidadeCnh';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-cadastrar-motorista',
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    LoadingComponent,
  ],
  templateUrl: './cadastrar-motorista.component.html',
  styleUrl: './cadastrar-motorista.component.css',
})
export class CadastrarMotoristaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
    private motoristaService: MotoristaService,
  ) {}

  formMotorista!: FormGroup;
  loading = false;

  ngOnInit(): void {
    document.title = 'Cadastrar Motorista';

    this.formMotorista = this.fb.group({
      nome: ['', Validators.required],
      cnh: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      dataValidadeCnh: ['', Validators.required],
      tipoSanguineo: [''],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  async validarFormulario() {
    this.loading = true;
    const dataNascimento = this.formMotorista.get('dataNascimento')?.value;
    const dataValidadeCnh = this.formMotorista.get('dataValidadeCnh')?.value;
    const payload = this.formMotorista.value;

    console.log('Payload', payload);

    if (!dataNascimento || dataNascimento == null) {
      this.flashMessage.show(
        'Por favor preencha a data de nascimento do motorista!',
        'error',
      );
      this.loading = false;
      return;
    }

    const idade = await verificarIdade(dataNascimento);

    if (idade < 18) {
      this.flashMessage.show('O motorista deve ser maior de idade!', 'error');
      this.loading = false;
      return;
    }

    const vencida = verificarValidadeCnh(dataValidadeCnh);

    if (vencida) {
      this.flashMessage.show('A carteira do motorista está vencida!', 'error');
      this.loading = false;
      return;
    }

    if (this.formMotorista.invalid) {
      this.flashMessage.show(`Preencha todos os campos obrigatórios!`, 'error');
      this.loading = false;
      return;
    }

    this.motoristaService.cadastrarMotorista(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.flashMessage.show(res.message, res.status);
        this.formMotorista.reset();
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.flashMessage.show(err.error.message, err.error.status);
        this.loading = false;
      },
    });
  }
}
