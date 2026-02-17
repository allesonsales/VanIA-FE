import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  endPoint = '/usuarios';

  buscarUsuario() {
    return this.http.get(`${environment.apiUrl}${this.endPoint}/me`, {
      withCredentials: true,
    });
  }

  public login(payload: any) {
    return this.http.post(
      `${environment.apiUrl}${this.endPoint}/login`,
      payload,
      {
        withCredentials: true,
      },
    );
  }

  public cadastrar(payload: any) {
    return this.http.post(`${environment.apiUrl}${this.endPoint}`, payload);
  }

  verificarEmailPrimeiroAcesso(payload: any) {
    return this.http.post(
      `${environment.apiUrl}${this.endPoint}/verificar-email-primeiro-acesso`,
      payload,
      { withCredentials: true },
    );
  }

  cadastrarSenhaPrimeiroAcesso(payload: any) {
    return this.http.put(
      `${environment.apiUrl}${this.endPoint}/cadastrar-senha-primeiro-acesso`,
      payload,
      { withCredentials: true },
    );
  }

  sair() {
    return this.http.get(`${environment.apiUrl}${this.endPoint}/logout`, {
      withCredentials: true,
    });
  }
}
