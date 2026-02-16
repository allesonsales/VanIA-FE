import { Escola } from './Escola';
import { Motorista } from './Motorista';
import { Van } from './Van';

export interface Rota {
  id: number;
  nome: string;
  turno: string;
  ativa: number;
  escola: Escola;
  van: Van;
  motorista: Motorista;
  horario_inicio_ida: string;
  horario_fim_ida: string;
  horario_inicio_volta: string;
  horario_fim_volta: string;
}
