import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ViagemService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/admin-viagens';

  consultarViagens() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  consultarViagem(id: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/${id}`, {
      withCredentials: true,
    });
  }
}
