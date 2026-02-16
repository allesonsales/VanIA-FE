import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AppMotoristaService {
  constructor(private httpClient: HttpClient) {}

  endPoit = '/app-motorista';

  consultarEstatisticaMotorista() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoit}`, {
      withCredentials: true,
    });
  }
}
