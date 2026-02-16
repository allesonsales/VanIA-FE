import { Aluno, AlunoFinanceiro } from './Aluno';
import { Responsavel } from './Responsavel';

export interface Pagamento {
  id: number;
  aluno: Aluno;
  responsavel: Responsavel;
  vencimento: string;
  pago_em?: string;
  tipo_pagamento?: string;
  valor: number;
  status: number;
  statusLabel: PagamentoStatus;
}

export interface PagamentoStatus {
  label: string;
  classe: string;
}
