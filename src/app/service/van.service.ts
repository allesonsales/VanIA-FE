import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Van } from '../../types/Van';

@Injectable({
  providedIn: 'root',
})
export class VanService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/vans';

  cadastrarVan(payload: any) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endPoint}`,
      payload,
      { withCredentials: true },
    );
  }

  buscarVans() {
    return this.httpClient.get<Van[]>(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  buscarMarcas() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/marcas`, {
      withCredentials: true,
    });
  }

  buscarVan(vanId: number) {
    return this.httpClient.get(
      `${environment.apiUrl}${this.endPoint}/${vanId}`,
      { withCredentials: true },
    );
  }

  atualizarVan(payload: any, vanId: number) {
    return this.httpClient.put(
      `${environment.apiUrl}${this.endPoint}/${vanId}`,
      payload,
      { withCredentials: true },
    );
  }

  buscarModelos(marcaId: number) {
    return this.httpClient.get(
      `${environment.apiUrl}${this.endPoint}/marcas/${marcaId}`,
      { withCredentials: true },
    );
  }

  deletarVan(vanId: any) {
    return this.httpClient.delete(
      `${environment.apiUrl}${this.endPoint}/${vanId}`,
      { withCredentials: true },
    );
  }
}
