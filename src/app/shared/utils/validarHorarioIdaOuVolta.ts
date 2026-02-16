function validarHorarioIdaOuVolta(horarioInicio: string, horarioFim: string) {
  const horaParaMinutos = (hora: string) => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  };

  if (horaParaMinutos(horarioInicio) >= horaParaMinutos(horarioFim)) {
    return {
      valido: false,
      message: 'O horário de início deve ser menor que o horário final.',
    };
  }

  return {
    valido: true,
  };
}

export default validarHorarioIdaOuVolta;
