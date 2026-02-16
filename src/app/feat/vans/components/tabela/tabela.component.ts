import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Rota } from '../../../../../types/Rotas';
import { Van } from '../../../../../types/Van';
import { Router } from '@angular/router';
import { VanService } from '../../../../service/van.service';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  constructor(
    private router: Router,
    private vanService: VanService,
  ) {}

  @Input() vans!: Van[];
  vanId: number | null = null;
  vanFiltradas: Van[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.vans) return;
    this.vanFiltradas = this.vans;
  }

  filtroAtivo = '';
  valoresFiltro: string[] = [];

  trocarFiltroAtivo(event: any) {
    const valor = event.target.value;
    this.filtroAtivo = valor;
    console.log('filtrou', valor);
  }

  filtrar(event: any) {
    if (!this.filtroAtivo) return;

    const valor = event.detail.value;
    this.vanFiltradas = this.vans.filter(
      (van) => (van as any)[this.filtroAtivo] === valor,
    );
  }

  verVan(vanId: number) {
    this.router.navigate([`/vans/${vanId}`]);
  }

  deletarVan(vanId: number) {
    console.log('deletou');
    this.vanService.deletarVan(vanId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
