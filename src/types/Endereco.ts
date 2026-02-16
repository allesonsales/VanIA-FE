export interface Endereco {
  id: number;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
}
