import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ViagemService } from '../../../../service/viagem.service';
import { Viagens } from '../../../../../types/Viagens';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-detalhe-viagem',
  imports: [HeaderComponent, CommonModule, IonicModule],
  templateUrl: './detalhe-viagem.component.html',
  styleUrl: './detalhe-viagem.component.css',
})
export class DetalheViagemComponent implements OnInit {
  viagem: Viagens | null = null;
  constructor(
    private route: ActivatedRoute,
    private viagemService: ViagemService,
  ) {}

  ngOnInit(): void {
    document.title = 'VanIA | Detalhe Viagem';

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.viagemService.consultarViagem(id).subscribe({
      next: (res: any) => {
        this.viagem = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
