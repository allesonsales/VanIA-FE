import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Version,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { flash, navigate } from 'ionicons/icons';
import { UsuarioService } from '../../../service/usuario.service';
import { FlashMessageService } from '../../../service/flash-message.service';
import { NgxMaskDirective } from 'ngx-mask';
import verificarIdade from '../../../shared/utils/verificarIdade';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    LoadingComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private flashMessage: FlashMessageService,
  ) {}

  verSenha = false;
  verSenhaCadastro = false;
  verConfirmarSenha = false;
  icone = 'eye-outline';
  ativo = 'entrar';
  formUsuario!: FormGroup;
  formLogin!: FormGroup;
  loading = false;

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      nome: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      confirmacaoSenha: ['', Validators.required],
    });

    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  fechar() {
    this.verSenhaCadastro = false;
    this.verConfirmarSenha = false;
    this.ativo = 'entrar';
  }

  toggleSenhaCadastro() {
    this.verSenhaCadastro = !this.verSenhaCadastro;
  }

  toggleConfirmaSenha() {
    this.verConfirmarSenha = !this.verConfirmarSenha;
  }

  toggleSenha() {
    this.verSenha = !this.verSenha;
    if (this.verSenha == false) {
      this.icone = 'eye-outline';
    } else {
      this.icone = 'eye-off-outline';
    }
  }

  verificarEntrar() {
    if (this.ativo == 'entrar') {
      console.log('Enviando');
      this.validarLogin();
    } else {
      this.ativo = 'entrar';
    }
  }

  verificarCadastrar() {
    if (this.ativo == 'cadastrar') {
      this.validarFormulario();
    } else {
      this.ativo = 'cadastrar';
    }
  }

  validarFormulario() {
    if (this.formUsuario.invalid) {
      this.formUsuario.markAllAsTouched();
      this.flashMessage.show('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    this.loading = true;

    const nome = this.formUsuario.get('nome')?.value;
    const email = this.formUsuario.get('email')?.value;
    const senha = this.formUsuario.get(`senha`)?.value;
    const dataNascimento = this.formUsuario.get('dataNascimento')?.value;
    const confirmacaoSenha = this.formUsuario.get(`confirmacaoSenha`)?.value;

    const idade = verificarIdade(dataNascimento);

    if (idade < 18) {
      this.flashMessage.show(
        'Você precisa ser maior de 18 anos para realizar o cadastro!',
        'error',
      );
      this.loading = false;
      return;
    }

    if (!email || email.trim() == '') {
      this.flashMessage.show('Digite um e-mail válido!', 'error');
      this.loading = false;
      return;
    }

    if (!nome || nome.trim().split(' ').length < 2) {
      this.flashMessage.show(`Por favor digite o nome completo!`, 'error');
      this.loading = false;
      return;
    }

    if (senha != confirmacaoSenha) {
      this.flashMessage.show(`As senhas digitas não coincidem!`, `error`);
      this.loading = false;
      return;
    }

    const payload = this.formUsuario.value;

    console.log(payload);
    this.usuarioService.cadastrar(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.flashMessage.show(`Cadastro realizado com sucesso!`, `success`);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  validarLogin() {
    if (this.formLogin.invalid) {
      this.formUsuario.markAllAsTouched();
      this.flashMessage.show('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    const payload = this.formLogin.value;

    this.usuarioService.login(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
        console.error(err);
      },
    });
  }

  entrar() {
    this.router.navigate(['/dashboard']);
  }
}
