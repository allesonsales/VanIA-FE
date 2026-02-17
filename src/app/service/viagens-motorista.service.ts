import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ViagensMotoristaService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/viagens';

  consultarViagemAtiva() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/ativa`, {
      withCredentials: true,
    });
  }

  consultarViagensParaIniciar() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  consultarViagemPorId(id: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/${id}`, {
      withCredentials: true,
    });
  }

  iniciarViagem(id: number) {
    return this.httpClient.put(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  finalizarViagem(payload: any, id: number) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      payload,
      { withCredentials: true },
    );
  }
}
