import { Endereco } from './Endereco';
import { Escola } from './Escola';
import { Motorista } from './Motorista';
import { Van } from './Van';

export interface Rota {
  id: number;
  nome: string;
  status: number;
  endereco: Endereco;
  escola: Escola;
  van: Van;
  motorista: Motorista;
  hora_inicio_ida: string;
  hora_fim_ida: string;
  hora_inicio_volta: string;
  hora_fim_volta: string;
}
