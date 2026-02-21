import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Rota } from '../../../../../types/Rotas';
import { Router } from '@angular/router';
import { Motorista } from '../../../../../types/Motorista';
import { TelefonePipe } from '../../../../../types/pipes/Telefone-Pipe';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule, TelefonePipe],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Input() motoristas!: Motorista[];
  motoristasFiltrados: Motorista[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.motoristas) return;
    this.motoristasFiltrados = this.motoristas;
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
    this.motoristasFiltrados = this.motoristas.filter(
      (rota) => (rota as any)[this.filtroAtivo] === valor,
    );
  }

  consultarMotorista(id: number) {
    this.router.navigate([`/motorista/${id}`]);
  }
}
