import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  imports: [CommonModule],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css',
})
export class ModalDeleteComponent {
  @Input() textoEntrada!: string;
  @Input() abrirModal!: boolean;

  @Output() fechar = new EventEmitter();
  @Output() confirmar = new EventEmitter();

  fecharModal() {
    this.fechar.emit();
  }

  confirmarAcao() {
    this.confirmar.emit();
  }
}
