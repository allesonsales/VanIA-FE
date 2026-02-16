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

  buscarTipos() {
    return this.httpClient.get<TipoEscola[]>(
      `${environment.apiUrl}${this.endPoint}/tipos`,
      {
        withCredentials: true,
      },
    );
  }
}
