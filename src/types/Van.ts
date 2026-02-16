export interface Van {
  id: number;
  numero: number;
  placa: string;
  lugares: number;
  renavam: number;
  marca: number;
  modelo: string;
  modelo_van?: ModeloVan;
  status: number;
}

export interface ModeloVan {
  id?: number;
  marca_id?: number;
  modelo?: string;
}
