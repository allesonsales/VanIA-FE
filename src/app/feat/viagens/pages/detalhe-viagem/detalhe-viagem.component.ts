import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ViagemService } from '../../../../service/viagem.service';
import { Viagens } from '../../../../../types/Viagens';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-detalhe-viagem',
  imports: [HeaderComponent, CommonModule, IonicModule, LoadingComponent],
  templateUrl: './detalhe-viagem.component.html',
  styleUrl: './detalhe-viagem.component.css',
})
export class DetalheViagemComponent implements OnInit {
  viagem: Viagens | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private viagemService: ViagemService,
    private flashMessage: FlashMessageService,
  ) {}

  ngOnInit(): void {
    document.title = 'VanIA | Detalhe Viagem';

    this.loading = true;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.viagemService.consultarViagem(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.viagem = res;
        console.log(res);
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
        console.log(err);
      },
    });
  }
}
