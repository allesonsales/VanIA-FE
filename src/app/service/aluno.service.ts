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
}
