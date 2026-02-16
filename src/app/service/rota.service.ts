import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RotaService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/rotas';

  cadastrarRotas(payload: any) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endPoint}`,
      payload,
      {
        withCredentials: true,
      },
    );
  }

  buscarRotas() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  buscarRotaPorTurnoeEscola(payload: any) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endPoint}/turnoEscola`,
      payload,
      { withCredentials: true },
    );
  }
}
