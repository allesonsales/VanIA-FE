import { Component, OnInit } from '@angular/core';
import { ViagemService } from '../../../../service/viagem.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Viagens } from '../../../../../types/Viagens';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-viagens',
  imports: [HeaderComponent, TabelaComponent, LoadingComponent],
  templateUrl: './viagens.component.html',
  styleUrl: './viagens.component.css',
})
export class ViagensComponent implements OnInit {
  constructor(private viagemService: ViagemService) {}
  loading: boolean = false;
  viagens: Viagens[] = [];

  ngOnInit(): void {
    document.title = 'VanIA | Viagens';

    this.loading = true;

    this.viagemService.consultarViagens().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.viagens = res;
        console.log(res);
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }
}
