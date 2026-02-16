const statusMap: Record<number, { label: string }> = {
  1: { label: 'Creche' },
  2: { label: 'Municipal' },
  3: { label: 'Estadual' },
  4: { label: 'Técnico' },
  5: { label: 'Faculdade' },
};

export function mapearEnumEscola(status: number) {
  return statusMap[status].label ?? { label: 'Desconhecido' };
}
