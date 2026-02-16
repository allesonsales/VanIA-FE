export interface EnderecoViaCep {
  id: number;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  localidade: string;
  uf: string;
  latitude?: number;
  longitude?: number;
}
