import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  @Input() min = '';
  @Input() max = '';
  @Input() mesSelecionado = '';
  @Output() valueChange = new EventEmitter();
  anoAtual = new Date().getFullYear();
  mesAtual = new Date().getMonth();

  selecionarMes(valor: any) {
    this.valueChange.emit(valor);
    this.mesSelecionado = valor;
  }
}
