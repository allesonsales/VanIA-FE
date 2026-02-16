import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { Escola } from '../../../../../types/Escola';
import { EscolaService } from '../../../../service/escola.service';

@Component({
  selector: 'app-escolas',
  imports: [HeaderComponent, TabelaComponent],
  templateUrl: './escolas.component.html',
  styleUrl: './escolas.component.css',
})
export class EscolasComponent implements OnInit {
  constructor(private escolaService: EscolaService) {}

  escolas: Escola[] = [];

  escolasFiltradas = [...this.escolas];

  ngOnInit(): void {
    document.title = 'VanIA | Escolas';
    this.escolaService.buscarEscolas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.escolas = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pesquisarEscola(event: any) {
    const valor = event.target.value;

    this.escolasFiltradas.filter((escola) => escola.nome === valor);
  }
}
