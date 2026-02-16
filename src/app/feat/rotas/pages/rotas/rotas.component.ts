import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CardRotaComponent } from '../../components/card-rota/card-rota.component';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-rotas',
  imports: [HeaderComponent, CommonModule, TabelaComponent],
  templateUrl: './rotas.component.html',
  styleUrl: './rotas.component.css',
})
export class RotasComponent {
  rotas = [
    {
      id: 1,
      nome: 'Escola João Dias - Bairro Rio Cotia',
      turno: 'MANHA',
      ativa: 1,

      escola: {
        id: 10,
        tipo: 1,
        nome: 'Escola Municipal João Dias',
        telefone: '1140019000',
        status: 1,
        endereco: {
          id: 5,
          cep: '06700-000',
          rua: 'Rua das Acácias',
          bairro: 'Jardim Central',
          cidade: 'Cotia',
          estado: 'SP',
        },
      },

      van: {
        id: 3,
        numero: 12,
        placa: 'ABC-1234',
        lugares: 15,
        marca: 1,
        modelo: 'Sprinter',
        status: 1,
      },

      motorista: {
        id: 7,
        nome: 'Carlos Silva',
        dataNascimento: '1985-06-12',
        telefone: '11999990000',
        cnh: '12345678900',
        validadeCnh: '2028-05-10',
      },

      horario_inicio_ida: '06:30',
      horario_fim_ida: '07:30',
      horario_inicio_volta: '11:30',
      horario_fim_volta: '12:30',
    },
  ];
}
