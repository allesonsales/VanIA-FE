import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ViagensMotoristaService } from '../../../../service/viagens-motorista.service';
import { ViagemInicio, Viagens } from '../../../../../types/Viagens';
import { IonGrid } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Rota } from '../../../../../types/Rotas';
import { Router } from '@angular/router';
import { HoraPipe } from '../../../../../types/pipes/Hora';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lista-viagens',
  imports: [HeaderComponent, CommonModule, HoraPipe, IonicModule],
  templateUrl: './lista-viagens.component.html',
  styleUrl: './lista-viagens.component.css',
})
export class ListaViagensComponent implements OnInit {
  constructor(
    private viagensMotoristaService: ViagensMotoristaService,
    private router: Router,
  ) {}
  rotas: Rota[] = [];

  ngOnInit(): void {
    this.viagensMotoristaService.consultarViagensParaIniciar().subscribe({
      next: (res: any) => {
        this.rotas = res;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  iniciarRota(id: number) {
    this.router.navigate([`/motorista/iniciar/`, id]);
  }
}
