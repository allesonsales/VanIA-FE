import { Aluno } from './Aluno';
import { Escola } from './Escola';
import { Rota } from './Rotas';

export interface Viagens {
  id: number;
  rota_id: number;
  tipo: number;
  hora_inicio?: string;
  hora_fim?: string;
  data?: string;
  rota?: Rota;
  escola?: Escola;
  alunos?: Aluno[];
}

export interface ViagemInicio {
  rota_id: number;
  nome_rota: string;
  hora_inicio_ida: string;
  hora_fim_ida: string;
  hora_inicio_volta: string;
  hora_fim_volta: string;
  escolas: {
    id: number;
    nome: string;
    alunos: {
      id: number;
      nome: string;
      presenca: boolean;
    }[];
  }[];
}
