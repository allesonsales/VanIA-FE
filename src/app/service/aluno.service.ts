import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  endPoint = '/alunos';

  cadastrarAluno(payload: any) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endPoint}`,
      payload,
      { withCredentials: true },
    );
  }

  buscarAlunos() {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}`, {
      withCredentials: true,
    });
  }

  buscarAluno(id: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.endPoint}/${id}`, {
      withCredentials: true,
    });
  }

  atualizarAluno(id: number, payload: any) {
    return this.httpClient.put(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      payload,
      {
        withCredentials: true,
      },
    );
  }

  excluirAluno(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      {
        withCredentials: true,
      },
    );
  }
}
