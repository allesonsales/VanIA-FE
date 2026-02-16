import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Escola } from '../../../../../types/Escola';
import { EscolaService } from '../../../../service/escola.service';
import { Router } from '@angular/router';
import { mapearEnumEscola } from '../../../../shared/utils/mapearEnumEscola';
import { TelefonePipe } from '../../../../../types/pipes/Telefone-Pipe';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [IonicModule, CommonModule, TelefonePipe],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Input() escolas!: Escola[];
  escolasBase: Escola[] = [];
  escolasFiltradas: Escola[] = [];

  constructor(
    private escolaService: EscolaService,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['escolas'] && this.escolas?.length) {
      this.escolasBase = this.escolas.map((escola: any) => ({
        ...escola,
        statusLabel: mapearEnumEscola(escola.tipo),
      }));

      this.escolasFiltradas = [...this.escolasBase];
    }
  }

  filtrar(event: any) {
    const valor = Number(event.target.value);
    this.escolasFiltradas = this.escolasBase.filter(
      (escola) => escola.tipo === valor,
    );
  }

  pesquisarEscola(event: any) {
    const valor = event.detail.value.toLowerCase();
    console.log('pesquisou: ', valor);

    this.escolasFiltradas = this.escolasBase.filter((escola) =>
      escola.nome.toLowerCase().includes(valor),
    );
  }

  limparFiltros() {
    this.escolasFiltradas = this.escolasBase;
  }

  buscarEscola(id: number) {
    console.log('clicou');
    this.router.navigate([`/escolas/${id}`]);
  }
}
