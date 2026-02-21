import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Rota } from '../../../../../types/Rotas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Input() rotas!: Rota[];
  rotasFiltradas: Rota[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.rotas) return;
    this.rotasFiltradas = this.rotas;
  }

  filtroAtivo = '';
  valoresFiltro: string[] = [];

  trocarFiltroAtivo(event: any) {
    const valor = event.target.value;
    this.filtroAtivo = valor;
    console.log('filtrou', valor);
  }

  getNomesEscolasString(rota: Rota): string {
    return rota.escolas.map((e) => e.nome).join(', ');
  }

  filtrar(event: any) {
    if (!this.filtroAtivo) return;

    const valor = event.detail.value;
    this.rotasFiltradas = this.rotas.filter(
      (rota) => (rota as any)[this.filtroAtivo] === valor,
    );
  }

  consultarRota(id: number) {
    this.router.navigate([`/rotas/${id}`]);
  }
}
