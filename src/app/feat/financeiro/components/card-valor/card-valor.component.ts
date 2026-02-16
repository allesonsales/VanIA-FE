import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-valor',
  imports: [CommonModule],
  templateUrl: './card-valor.component.html',
  styleUrl: './card-valor.component.css',
})
export class CardValorComponent {
  @Input() estimativa!: number;
  @Input() recebido!: number;
  @Input() atrasado!: number;
}
