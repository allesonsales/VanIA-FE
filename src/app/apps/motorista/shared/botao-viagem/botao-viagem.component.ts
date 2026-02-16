import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao-viagem',
  imports: [],
  templateUrl: './botao-viagem.component.html',
  styleUrl: './botao-viagem.component.css',
})
export class BotaoViagemComponent {
  @Input() texto!: string;
  @Output() clicado = new EventEmitter();

  chamarFuncao() {
    this.clicado.emit();
  }
}
