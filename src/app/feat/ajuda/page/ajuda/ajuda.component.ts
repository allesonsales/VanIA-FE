import { Component } from '@angular/core';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-ajuda',
  imports: [AccordionComponent, HeaderComponent],
  templateUrl: './ajuda.component.html',
  styleUrl: './ajuda.component.css',
})
export class AjudaComponent {
  abrirItemVan: boolean = false;

  abrirAcordionVan() {
    this.abrirItemVan = true;
  }
}
