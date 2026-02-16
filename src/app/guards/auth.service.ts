import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  validarAuth() {
    return this.httpClient.get(`${environment.apiUrl}/usuarios/validar`, {
      withCredentials: true,
    });
  }
}
