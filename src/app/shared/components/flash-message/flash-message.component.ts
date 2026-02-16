import { Component } from '@angular/core';
import { FlashMessageService } from '../../../service/flash-message.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flash-message',
  imports: [CommonModule],
  templateUrl: './flash-message.component.html',
  styleUrl: './flash-message.component.css',
  animations: [
    trigger('flashAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate(
          '250ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateX(-10px)' }),
        ),
      ]),
    ]),
  ],
})
export class FlashMessageComponent {
  mensagem$!: Observable<any>;

  constructor(private flashMessage: FlashMessageService) {
    this.mensagem$ = this.flashMessage.mensagem$;
  }
}
