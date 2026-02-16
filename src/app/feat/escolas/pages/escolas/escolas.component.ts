import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { Escola } from '../../../../../types/Escola';

@Component({
  selector: 'app-escolas',
  imports: [HeaderComponent, TabelaComponent],
  templateUrl: './escolas.component.html',
  styleUrl: './escolas.component.css',
})
export class EscolasComponent {
  escolas: Escola[] = [
    {
      id: 1,
      tipo: 1,
      nome: 'Escola Municipal João Dias',
      telefone: '(11) 4700-1234',
      status: 1,
      endereco: {
        id: 101,
        cep: '06700-000',
        rua: 'Rua das Flores',
        bairro: 'Rio Cotia',
        cidade: 'Cotia',
        estado: 'SP',
        latitude: -23.6023,
        longitude: -46.9195,
      },
    },
    {
      id: 2,
      tipo: 2,
      nome: 'Colégio Monte Azul',
      telefone: '(11) 4711-5678',
      status: 1,
      endereco: {
        id: 102,
        cep: '06710-000',
        rua: 'Avenida Central',
        bairro: 'Jardim das Flores',
        cidade: 'Cotia',
        estado: 'SP',
      },
    },
    {
      id: 3,
      tipo: 1,
      nome: 'Escola Municipal Maria Aparecida',
      telefone: '(11) 4722-8899',
      status: 1,
      endereco: {
        id: 103,
        cep: '06720-000',
        rua: 'Rua João Batista',
        bairro: 'Parque São George',
        cidade: 'Cotia',
        estado: 'SP',
      },
    },
    {
      id: 4,
      tipo: 3,
      nome: 'Colégio Técnico Cotia',
      telefone: '(11) 4733-4455',
      status: 0,
      endereco: {
        id: 104,
        cep: '06730-000',
        rua: 'Av. Industrial',
        bairro: 'Centro',
        cidade: 'Cotia',
        estado: 'SP',
        latitude: -23.5981,
        longitude: -46.9173,
      },
    },
  ];

  escolasFiltradas = [...this.escolas];

  pesquisarEscola(event: any) {
    const valor = event.target.value;

    this.escolasFiltradas.filter((escola) => escola.nome === valor);
  }
}
