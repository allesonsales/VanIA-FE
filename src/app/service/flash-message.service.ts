import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FlashMessageType = 'success' | 'error';

export interface FlashMessage {
  mensagem: string;
  tipo: FlashMessageType;
}

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  constructor() {}
  private mensagemSubject = new BehaviorSubject<FlashMessage | null>(null);

  mensagem$ = this.mensagemSubject.asObservable();

  show(mensagem: string, tipo: FlashMessageType): void {
    this.mensagemSubject.next({ mensagem, tipo });

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.mensagemSubject.next(null);
  }
}
