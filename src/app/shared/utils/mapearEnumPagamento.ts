const statusMap: Record<number, { label: string; classe: string }> = {
  0: { label: 'Inativo', classe: 'inativo' },
  1: { label: 'Pendente', classe: 'pendente' },
  2: { label: 'Pago', classe: 'pago' },
  3: { label: 'Vencido', classe: 'em-atraso' },
};

export function mapearPagamentoEnum(status: number) {
  return statusMap[status] ?? { label: 'Desconhecido', classe: 'desconhecido' };
}
