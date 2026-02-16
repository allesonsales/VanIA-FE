async function buscarCep(cep: string) {
  try {
    const cepLimpo = cep.replace(/\D/g, '');

    // valida tamanho
    if (cepLimpo.length !== 8) {
      console.warn('CEP inválido:', cepLimpo);
      return null;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.erro) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}

export default buscarCep;
