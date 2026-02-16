export interface Endereco {
  id: number;
  cep: string;
  rua: string;
  numero?: number;
  bairro: string;
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
}
