import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioService } from '../../../../service/usuario.service';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { sendSharp } from 'ionicons/icons';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal-primeiro-acesso',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './modal-primeiro-acesso.component.html',
  styleUrl: './modal-primeiro-acesso.component.css',
})
export class ModalPrimeiroAcessoComponent {
  primeiroAcesso: FormGroup;
  constructor(
    private flashmessage: FlashMessageService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) {
    this.primeiroAcesso = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    });
  }
  verSenha: boolean = false;
  verConfirmarSenha: boolean = false;

  @Input() abrirModal: boolean = false;
  @Output() abrir = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  cadastrarSenha: boolean = false;

  verificarEmail() {
    const email = this.primeiroAcesso.get('email')?.value;
    const payload = { email: email };
    this.usuarioService.verificarEmailPrimeiroAcesso(payload).subscribe({
      next: (res: any) => {
        this.flashmessage.show(res.message, res.status);
        if (res.status == 'success') {
          this.cadastrarSenha = true;
        }
      },
      error: (err) => {
        this.flashmessage.show(err.error.message, err.error.status);
      },
    });
  }

  toggleVerSenha() {
    this.verSenha = !this.verSenha;
  }
  toggleConfirmarSenha() {
    this.verConfirmarSenha = !this.verConfirmarSenha;
  }

  enviarSenhaCadastro() {
    const email = this.primeiroAcesso.get('email')?.value;
    const senha = this.primeiroAcesso.get('senha')?.value;
    const confirmarSenha = this.primeiroAcesso.get('confirmarSenha')?.value;

    console.log(senha, confirmarSenha);

    if (senha != confirmarSenha) {
      this.flashmessage.show(
        'A senha e a sena de confirmação estão diferentes!',
        'error',
      );

      return;
    }

    const payload = {
      email,
      senha,
    };

    this.usuarioService.cadastrarSenhaPrimeiroAcesso(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.flashmessage.show(res.message, res.status);
        this.fechar.emit();
        this.cadastrarSenha = false;
      },
      error: (err) => {
        console.log(err);
        this.flashmessage.show(err.error.message, err.error.status);
      },
    });
  }

  abrirSenha() {
    this.abrir.emit();
  }

  fecharModal() {
    this.cadastrarSenha = false;
    this.primeiroAcesso.get('email')?.setValue('');
    this.primeiroAcesso.get('senha')?.setValue('');
    this.fechar.emit();
  }
}
