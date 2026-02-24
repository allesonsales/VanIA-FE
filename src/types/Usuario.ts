export interface Usuario {
  id: number;
  email: string;
  nomeUsuario: string;
  senha: string;
  nome: string;
  telefone: string;
  nomeFantasia: string;
  total_alunos?: number;
  total_rotas?: number;
  total_vans?: number;
  total_escolas?: number;
  total_viagens?: number;
}
