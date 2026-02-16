import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  endPoint = '/usuarios';

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
}
