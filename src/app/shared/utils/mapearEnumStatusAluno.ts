const statusMap: Record<number, { label: string; classe: string }> = {
  0: { label: 'Inativo', classe: 'inativo' },
  1: { label: 'Ativo', classe: 'ativo' },
  2: { label: 'Atrasado', classe: 'atrasado' },
  3: { label: 'Bloqueado', classe: 'bloqueado' },
};

export function mapearStatusAluno(status: number) {
  return statusMap[status] ?? { label: 'Desconhecido', classe: 'desconhecido' };
}
