import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../../types/Usuario';
import transformarData from '../../shared/utils/transformarData';
import { FlashMessageService } from '../../service/flash-message.service';
import { flash } from 'ionicons/icons';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-perfil',
  imports: [
    HeaderComponent,
    FormsModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  formUsuario: FormGroup;
  loading: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
  ) {
    this.formUsuario = fb.group({
      nome: ['', Validators.required],
      nomeFantasia: [''],
      cpf: [''],
      email: [''],
      dataNascimento: [''],
      telefone: [''],
      totalAlunos: [''],
      totalEscolas: [''],
    });
  }

  ngOnInit(): void {
    this.usuarioService.buscarUsuario().subscribe({
      next: (res: any) => {
        this.usuario = res;

        this.formUsuario.patchValue({
          nome: res.nome,
          nomeFantasia: res.nome_fantasia,
          cpf: res.cpf,
          email: res.email,
          telefone: res.telefone,
          dataNascimento: transformarData(res.data_nascimento),
        });
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
        console.log(err);
      },
    });
  }

  confirmar() {
    const payload = this.formUsuario.value;
    this.loading = true;

    this.usuarioService.atualizarUsuario(payload).subscribe({
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
