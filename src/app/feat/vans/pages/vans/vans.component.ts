import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { VanService } from '../../../../service/van.service';
import { Van } from '../../../../../types/Van';
import {
  FlashMessage,
  FlashMessageService,
} from '../../../../service/flash-message.service';

@Component({
  selector: 'app-vans',
  imports: [HeaderComponent, TabelaComponent],
  templateUrl: './vans.component.html',
  styleUrl: './vans.component.css',
})
export class VansComponent implements OnInit {
  constructor(
    private vanService: VanService,
    private flashMessage: FlashMessageService,
  ) {}
  vans: Van[] = [];

  ngOnInit(): void {
    this.vanService.buscarVans().subscribe({
      next: (res) => {
        console.log(res);
        this.vans = res;
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
