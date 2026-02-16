function verificarValidadeCnh(dataValidadeCnh: string) {
  const hoje = new Date();
  const dataValidade = new Date(dataValidadeCnh);
  let vencida = false;

  if (dataValidade < hoje) {
    vencida = true;
  }

  return vencida;
}

export default verificarValidadeCnh;
