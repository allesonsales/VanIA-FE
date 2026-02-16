import { Endereco } from './Endereco';
import { Escola } from './Escola';
import { Rota } from './Rotas';
import { Van } from './Van';

export interface Aluno {
  id: number;
  nome: string;
  dataNascimento: string;
  rg: string;
  valor: number;
  tipoSanguineo: string;
  responsaveis: number[];
  endereco: Endereco;
  rota: Rota;
  status: number;
}
