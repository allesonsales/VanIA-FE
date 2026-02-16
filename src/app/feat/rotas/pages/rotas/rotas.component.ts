import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { Rota } from '../../../../../types/Rotas';
import { RotaService } from '../../../../service/rota.service';

@Component({
  selector: 'app-rotas',
  imports: [HeaderComponent, CommonModule, TabelaComponent],
  templateUrl: './rotas.component.html',
  styleUrl: './rotas.component.css',
})
export class RotasComponent implements OnInit {
  constructor(private rotaService: RotaService) {}

  rotas: Rota[] = [];

  ngOnInit(): void {
    document.title = 'VanIA | Rotas';
    this.rotaService.buscarRotas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.rotas = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  consultarRota() {}
}
