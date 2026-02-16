async function buscarCep(cep: string) {
  if (cep.length < 8) return;

  try {
    const res = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default buscarCep;
