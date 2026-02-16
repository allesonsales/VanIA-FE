import { Component, OnInit } from '@angular/core';
import { ViagemService } from '../../../../service/viagem.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Viagens } from '../../../../../types/Viagens';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-viagens',
  imports: [HeaderComponent, TabelaComponent],
  templateUrl: './viagens.component.html',
  styleUrl: './viagens.component.css',
})
export class ViagensComponent implements OnInit {
  constructor(private viagemService: ViagemService) {}
  viagens: Viagens[] = [];

  ngOnInit(): void {
    document.title = 'VanIA | Viagens';

    this.viagemService.consultarViagens().subscribe({
      next: (res: any) => {
        this.viagens = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
