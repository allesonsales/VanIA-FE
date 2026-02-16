import { Component, Input } from '@angular/core';
import { Rota } from '../../../../../types/Rotas';

@Component({
  selector: 'app-card-rota',
  imports: [],
  templateUrl: './card-rota.component.html',
  styleUrl: './card-rota.component.css',
})
export class CardRotaComponent {
  @Input() rota!: Rota;
}
