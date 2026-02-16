export interface Motorista {
  id: number;
  nome: string;
  data_nascimento: string;
  telefone: string;
  cnh: string;
  data_validade_cnh: string;
  cpf?: string;
  tipo_sanguineo?: string;
  rotasAtivas?: number;
  usuario_id: number;
  usuario_motorista_id: number;
}
