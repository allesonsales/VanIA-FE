import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Escola, TipoEscola } from '../../types/Escola';

@Injectable({
  providedIn: 'root',
})
export class EscolaService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/escolas';

  cadastrarEscola(payload: Escola) {
    return this.httpClient.post<Escola>(
      `${environment.apiUrl}${this.endPoint}`,
      payload,
      { withCredentials: true },
    );
  }

  buscarEscolas() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  buscarEscola(id: any) {
    console.log('Chamou o service');
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/${id}`, {
      withCredentials: true,
    });
  }

  buscarTipos() {
    return this.httpClient.get<TipoEscola[]>(
      `${environment.apiUrl}${this.endPoint}/tipos`,
      {
        withCredentials: true,
      },
    );
  }

  atualizarEscola(payload: any, id: number) {
    return this.httpClient.put(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      payload,
      { withCredentials: true },
    );
  }

  deletarEscola(id: any) {
    return this.httpClient.delete(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      { withCredentials: true },
    );
  }
}
