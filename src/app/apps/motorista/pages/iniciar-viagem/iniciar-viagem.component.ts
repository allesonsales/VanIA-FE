import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ViagensMotoristaService } from '../../../../service/viagens-motorista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViagemInicio } from '../../../../../types/Viagens';
import { CommonModule } from '@angular/common';
import { IonGrid } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { FlashMessageService } from '../../../../service/flash-message.service';

@Component({
  selector: 'app-iniciar-viagem',
  imports: [HeaderComponent, CommonModule, IonicModule, LoadingComponent],
  templateUrl: './iniciar-viagem.component.html',
  styleUrl: './iniciar-viagem.component.css',
})
export class IniciarViagemComponent implements OnInit {
  constructor(
    private viagensMotoristaService: ViagensMotoristaService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessageService,
  ) {}
  viagem: ViagemInicio | null = null;
  iniciar: boolean = false;
  loading: boolean = false;
  horaInicio!: number;
  tempoDecorrido = 0;
  intervalId: any;
  viagemId!: number;
  rotaId!: number;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('chamou');
    this.viagensMotoristaService.consultarViagemPorId(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.viagem = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.viagensMotoristaService.consultarViagemAtiva().subscribe({
      next: (res: any) => {
        if (res) {
          this.rotaId = res.rota_id;
          this.viagemId = res.id;
          this.iniciar = true;

          const hoje = new Date();
          const [hora, minuto, segundo] = res.hora_inicio
            .split(':')
            .map(Number);
          hoje.setHours(hora, minuto, segundo, 0);
          this.horaInicio = hoje.getTime();
          this.iniciarTimer();
          this.viagem = res;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  iniciarViagem() {
    this.loading = true;
    console.log(this.viagem);
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.viagensMotoristaService.iniciarViagem(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.horaInicio = Date.now();
        this.flashMessage.show(res.message, res.status);
        this.iniciarTimer();
        this.iniciar = true;
        this.viagemId = res.viagem_id;
        this.rotaId = res.rota_id;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }

  iniciarTimer() {
    this.intervalId = setInterval(() => {
      const agora = Date.now();
      this.tempoDecorrido = Math.floor((agora - this.horaInicio) / 1000);
    }, 1000);
  }

  marcarPresenca(aluno: any, status: boolean) {
    aluno.presenca = status;
    console.log(this.viagem);
  }

  get todosPreenchidos() {
    if (!this.viagem || !this.viagem.alunos?.length) {
      return false;
    }
    return this.viagem.alunos.every(
      (aluno) => aluno.presenca === true || aluno.presenca === false,
    );
  }

  get tempoFormatado(): string {
    const horas = Math.floor(this.tempoDecorrido / 3600);
    const minutos = Math.floor((this.tempoDecorrido % 3600) / 60);
    const segundos = this.tempoDecorrido % 60;

    return `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(valor: number): string {
    return valor.toString().padStart(2, '0');
  }

  finalizarViagem() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const dados = {
      viagemId: this.viagemId,
      rotaId: this.rotaId,
      alunos: this.viagem?.alunos.map((aluno) => aluno),
    };

    console.log(dados);

    this.viagensMotoristaService.finalizarViagem(dados, id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.flashMessage.show(res.message, res.status);
        this.router.navigate(['/motorista']);
      },
      error: (err) => {
        console.log(err);
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
