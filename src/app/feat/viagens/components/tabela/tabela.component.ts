import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Rota } from '../../../../../types/Rotas';
import { Router } from '@angular/router';
import { Viagens } from '../../../../../types/Viagens';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Input() viagens!: Viagens[];
  viagensBase: Viagens[] = [];
  viagensFiltradas: Viagens[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.viagens) return;
    this.viagensBase = this.viagens;
    this.viagensFiltradas = this.viagens;
    console.log('chegou', this.viagens);
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
    this.viagensFiltradas = this.viagensBase.filter(
      (rota) => (rota as any)[this.filtroAtivo] === valor,
    );
  }

  consultarViagem(id: number) {
    this.router.navigate([`/viagem/${id}`]);
  }

  limparFiltros() {}
}
