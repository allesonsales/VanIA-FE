import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { BotaoViagemComponent } from '../../shared/botao-viagem/botao-viagem.component';
import { Router } from '@angular/router';
import { ViagensMotoristaService } from '../../../../service/viagens-motorista.service';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { AppMotoristaService } from '../../../../service/app-motorista.service';
import { Viagens } from '../../../../../types/Viagens';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, BotaoViagemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private viagensMotoristaService: ViagensMotoristaService,
    private flashMessage: FlashMessageService,
    private appMotoristaService: AppMotoristaService,
  ) {}

  quantidadeRotas: number | null = null;
  quantidadeAlunos: number | null = null;
  quantidadeViagens: number | null = null;
  ultimaViagem: Viagens | null = null;

  ngOnInit(): void {
    console.log('teste');
    this.viagensMotoristaService.consultarViagemAtiva().subscribe({
      next: (res: any) => {
        if (res) {
          this.flashMessage.show(
            'Você possui uma viagem em andamento!',
            'error',
          );
          this.router.navigate([`/motorista/iniciar/`, res.rota_id]);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.appMotoristaService.consultarEstatisticaMotorista().subscribe({
      next: (res: any) => {
        console.log('estatistica', res);
        this.quantidadeAlunos = res.quantidade_alunos;
        this.quantidadeRotas = res.quantidade_rotas;
        this.quantidadeViagens = res.quantidade_viagens;
        this.ultimaViagem = res.ultima_viagem;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.consultarEstatisticaMotorista();
  }

  consultarEstatisticaMotorista() {
    this.appMotoristaService.consultarEstatisticaMotorista().subscribe({
      next: (res) => {
        console.log('estatistica', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  irParaViagensDisponiveis() {
    this.router.navigate(['/motorista/listar-viagens']);
  }
}
