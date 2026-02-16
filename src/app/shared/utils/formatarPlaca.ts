function formatarPlaca(placa: string): string {
  if (!placa) return '';

  const limpa = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (limpa.length <= 3) return limpa;

  return limpa.slice(0, 3) + '-' + limpa.slice(3);
}

export default formatarPlaca;
