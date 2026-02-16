import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Motorista } from '../../types/Motorista';

@Injectable({
  providedIn: 'root',
})
export class MotoristaService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/motoristas';

  cadastrarMotorista(payload: Motorista) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endPoint}`,
      payload,
      {
        withCredentials: true,
      },
    );
  }

  buscarMotoristas() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  buscarMotorista(id: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/${id}`, {
      withCredentials: true,
    });
  }

  excluirMotorista(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      {
        withCredentials: true,
      },
    );
  }

  atualizarMotorista(id: number, payload: any) {
    return this.httpClient.put(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      payload,
      { withCredentials: true },
    );
  }
}
