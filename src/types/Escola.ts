import { Endereco } from './Endereco';

export interface Escola {
  id: number;
  tipo: number;
  nome: string;
  telefone: string;
  status: number;
  endereco: Endereco;
}

export interface TipoEscola {
  id: number;
  tipo: string;
}
