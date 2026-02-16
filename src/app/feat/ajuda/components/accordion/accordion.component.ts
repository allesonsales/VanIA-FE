import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-accordion',
  imports: [IonicModule, CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
})
export class AccordionComponent {
  @Input() titulo!: string;
  @Input() texto!: string;
  @Input() abrirAcordion: boolean = false;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() abrirModal = new EventEmitter<void>();

  abrir() {
    this.abrirAcordion = !this.abrirAcordion;
  }
}
