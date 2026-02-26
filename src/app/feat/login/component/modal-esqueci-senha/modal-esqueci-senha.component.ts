import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../service/usuario.service';
import { flash } from 'ionicons/icons';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-modal-esqueci-senha',
  imports: [IonicModule, ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './modal-esqueci-senha.component.html',
  styleUrl: './modal-esqueci-senha.component.css',
})
export class ModalEsqueciSenhaComponent {
  formSenha!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
    private usuarioService: UsuarioService,
  ) {
    this.formSenha = fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    });
  }

  @Input() abrirModal: boolean = false;
  @Output() abrir = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  verSenha: boolean = false;
  verConfirmarSenha: boolean = false;
  cadastrarSenha: boolean = false;
  loading: boolean = false;

  toggleVerSenha() {
    this.verSenha = !this.verSenha;
  }

  toggleVerConfirmarSenha() {
    this.verConfirmarSenha = !this.verConfirmarSenha;
  }

  fecharModal() {
    this.abrirModal = false;
    this.fechar.emit();
    this.formSenha.reset();
    this.cadastrarSenha = false;
  }

  verificarEmail() {
    this.loading = true;
    const email = this.formSenha.get('email')?.value;

    if (!email || email === '') {
      this.flashMessage.show('Digite um e-mail válido', 'error');
    }

    this.usuarioService.verificarEmail(email).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.senhaCadastrada) {
          this.cadastrarSenha = true;
        } else {
          this.flashMessage.show(
            'Você ainda não possui senha cadastrada!',
            'error',
          );
        }
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  enviarSenha() {
    this.loading = true;
    const email = this.formSenha.get('email')?.value;
    const senha = this.formSenha.get('senha')?.value;
    const confirmarSenha = this.formSenha.get('confirmarSenha')?.value;

    if (!senha || senha.length < 6) {
      this.flashMessage.show(
        'A senha deve ter pelo menos 6 caracteres.',
        'error',
      );
      this.loading = false;
      return;
    }

    if (senha != confirmarSenha) {
      this.flashMessage.show('As senhas não coincidem.', 'error');
      this.loading = false;
      return;
    }

    const payload = {
      email: email,
      senha: senha,
      confirmarSenha: confirmarSenha,
    };

    this.usuarioService.recuperarSenha(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.cadastrarSenha = false;
        this.abrirModal = false;
        this.formSenha.reset();
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
