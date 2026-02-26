import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/financeiro';

  buscarTodosPagamentos(mes: number, ano: number) {
    return this.httpClient.get(
      `${environment.apiUrl}${this.endPoint}/?mes=${mes}&ano=${ano}`,
      {
        withCredentials: true,
      },
    );
  }

  buscarPagamentosPorIdResponsavel(id: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/${id}`, {
      withCredentials: true,
    });
  }

  confirmarPagamento(id: number, payload: any) {
    return this.httpClient.patch(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      payload,
      {
        withCredentials: true,
      },
    );
  }

  cancelarPagamento(id: number, payload: any) {
    return this.httpClient.patch(
      `${environment.apiUrl}${this.endPoint}/cancelar/${id}`,
      payload,
      { withCredentials: true },
    );
  }

  contarVencidos() {
    return this.httpClient.get(
      `${environment.apiUrl}${this.endPoint}/contar-vencidos`,
    );
  }
}
