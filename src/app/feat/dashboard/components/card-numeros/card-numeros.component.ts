import { Component, Input } from '@angular/core';
import { NumerosDash } from '../../../../../types/NumerosDashboard';

@Component({
  selector: 'app-card-numeros',
  imports: [],
  templateUrl: './card-numeros.component.html',
  styleUrl: './card-numeros.component.css',
})
export class CardNumerosComponent {
  @Input() dadosCard!: NumerosDash;
}
