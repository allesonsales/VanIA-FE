import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VanService } from '../../../../service/van.service';
import { Van } from '../../../../../types/Van';
import { CommonModule } from '@angular/common';
import { Escola } from '../../../../../types/Escola';
import { Motorista } from '../../../../../types/Motorista';
import { EscolaService } from '../../../../service/escola.service';
import { MotoristaService } from '../../../../service/motorista.service';
import { Rota } from '../../../../../types/Rotas';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { RotaService } from '../../../../service/rota.service';
import { Router } from '@angular/router';
import buscarCep from '../../../../shared/utils/buscarCep';

@Component({
  selector: 'app-editar-rota',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingComponent,
  ],
  templateUrl: './editar-rota.component.html',
  styleUrl: './editar-rota.component.css',
})
export class EditarRotaComponent implements OnInit, OnChanges {
  @Input() abrirModal!: boolean;
  @Input() rota!: Rota | null;

  @Output() fechar = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private vanService: VanService,
    private escolaService: EscolaService,
    private motoristaService: MotoristaService,
    private rotaService: RotaService,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {}

  vans: Van[] = [];
  escolas: Escola[] = [];
  motoristas: Motorista[] = [];
  formRota!: FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
    this.formRota = this.fb.group({
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      vanId: ['', Validators.required],
      escolaId: ['', Validators.required],
      motoristaId: ['', Validators.required],
      horaInicioIda: ['', Validators.required],
      horaFimIda: ['', Validators.required],
      horaInicioVolta: ['', Validators.required],
      horaFimVolta: ['', Validators.required],
    });

    this.loading = true;

    this.vanService.buscarVans().subscribe({
      next: (res) => {
        console.log(res);
        this.vans = res;
        this.preencherFormulario();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.escolaService.buscarEscolas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.escolas = res;
        this.preencherFormulario();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.motoristaService.buscarMotoristas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.motoristas = res;
        this.preencherFormulario();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rota'] && this.rota && this.formRota)
      this.preencherFormulario();
  }

  fecharModalEdicao() {
    this.fechar.emit();
  }

  private preencherFormulario(): void {
    if (!this.rota) return;
    if (!this.vans.length || !this.escolas.length || !this.motoristas.length)
      return;

    const { endereco, van, motorista, escola } = this.rota;
    if (!endereco || !van || !motorista || !escola) return;

    this.formRota.patchValue({
      cep: endereco.cep,
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      vanId: van.id,
      motoristaId: this.rota.id,
      escolaId: escola.id,
      horaFimIda: this.rota.hora_fim_ida,
      horaInicioIda: this.rota.hora_inicio_ida,
      horaFimVolta: this.rota.hora_fim_volta,
      horaInicioVolta: this.rota.hora_inicio_volta,
    });
  }

  async validarEndereco() {
    const cep = this.formRota.get('cep')?.value;
    if (!cep || cep == '' || cep.length < 8) return;

    this.loading = true;

    const endereco = await buscarCep(cep);

    if (endereco === null) {
      this.loading = false;
      return;
    }

    if (endereco) {
      this.loading = false;
      this.formRota.get('rua')?.setValue(endereco.logradouro);
      this.formRota.get('bairro')?.setValue(endereco.bairro);
      this.formRota.get('cidade')?.setValue(endereco.localidade);
      this.formRota.get('estado')?.setValue(endereco.uf);
    }
  }

  confirmarEdicao() {
    this.loading = true;
    const payload = this.formRota.value;

    this.rotaService.atualizarRota(Number(this.rota?.id), payload).subscribe({
      next: (res: any) => {
        this.flashMessage.show(res.message, res.status);
        this.fecharModalEdicao();
        this.loading = false;
        this.router.navigate(['/rotas']);
      },
      error: (err) => {
        this.flashMessage.show(err.error.message, err.error.status);
        this.loading = false;
      },
    });
  }
}
