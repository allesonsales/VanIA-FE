import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../../types/Usuario';

@Component({
  selector: 'app-perfil',
  imports: [HeaderComponent, FormsModule, NgxMaskDirective],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.buscarUsuario().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
