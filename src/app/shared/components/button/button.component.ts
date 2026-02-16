import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink, IonicModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() texto = '';
  @Input() icone = '';
  @Input() rota = '';
  @Input() tipoIcone = '';
  @Output() acao = new EventEmitter();

  onClick(event: Event) {
    this.acao.emit();

    if (!this.rota) {
      event.preventDefault();
    }
  }
}
