import { Endereco } from './Endereco';
import { Escola } from './Escola';
import { Responsavel } from './Responsavel';
import { Rota } from './Rotas';
import { Van } from './Van';

export interface Aluno {
  id: number;
  nome: string;
  data_nascimento: string;
  rg: string;
  valor: number;
  tipo_sanguineo: string;
  responsavel: Responsavel;
  escola: Escola;
  endereco: Endereco;
  van: Van;
  rota: Rota;
  status: number;
  statusLabel: AlunoStatus;
  presenca?: boolean;
}

export interface AlunoStatus {
  label: string;
  classe: string;
}

export interface AlunoFinanceiro {
  id: number;
  nome: string;
  escola: Escola;
}
