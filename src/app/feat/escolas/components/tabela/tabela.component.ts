import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Escola } from '../../../../../types/Escola';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Input() escolas!: Escola[];
  escolasFiltradas: Escola[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.escolas) return;
    this.escolasFiltradas = this.escolas;
  }

  filtrar(event: any) {
    const valor = Number(event.target.value);
    this.escolasFiltradas = this.escolas.filter(
      (escola) => escola.tipo === valor
    );
  }

  pesquisarEscola(event: any) {
    const valor = event.detail.value.toLowerCase();
    console.log('pesquisou: ', valor);

    this.escolasFiltradas = this.escolas.filter((escola) =>
      escola.nome.toLowerCase().includes(valor)
    );
  }
}
