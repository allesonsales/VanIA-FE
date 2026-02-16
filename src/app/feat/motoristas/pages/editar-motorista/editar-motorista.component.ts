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
import { FlashMessageService } from '../../../../service/flash-message.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { Motorista } from '../../../../../types/Motorista';
import { MotoristaService } from '../../../../service/motorista.service';
import transformarData from '../../../../shared/utils/transformarData';

@Component({
  selector: 'app-editar-motorista',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule,
    IonicModule,
    NgxMaskDirective,
  ],
  templateUrl: './editar-motorista.component.html',
  styleUrl: './editar-motorista.component.css',
})
export class EditarMotoristaComponent implements OnChanges, OnInit {
  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {}

  @Input() motorista: Motorista | null = null;
  @Input() abrirModal: boolean = false;

  @Output() fecharModal = new EventEmitter<void>();

  formMotorista!: FormGroup;
  loading = false;

  ngOnInit(): void {
    document.title = `Motorista - ${this.motorista?.nome}`;
    this.loading = true;

    console.log('motoris  ta que chegou', this.motorista);

    this.formMotorista = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      cnh: ['', Validators.required],
      dataValidadeCnh: ['', Validators.required],
      tipoSanguineo: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    document.title = `Motorista - ${this.motorista?.nome}`;
    if (changes['motorista'] && this.motorista && this.formMotorista) {
      this.formMotorista.patchValue({
        nome: this.motorista.nome,
        telefone: this.motorista.telefone,
        cpf: this.motorista.cpf,
        cnh: this.motorista.cnh,
        dataValidadeCnh: transformarData(this.motorista.data_validade_cnh),
        dataNascimento: transformarData(this.motorista.data_nascimento),
        tipoSanguineo: this.motorista.tipo_sanguineo,
      });
    }
  }

  fechar() {
    this.fecharModal.emit();
  }

  atualizarMotorista() {
    const payload = this.formMotorista.value;

    this.loading = true;

    if (!this.motorista) return;

    this.motoristaService
      .atualizarMotorista(this.motorista?.id, payload)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.flashMessage.show(res.message, res.status);
          this.router.navigate([`/motoristas`]);
          this.abrirModal = false;
        },
        error: (err) => {
          this.loading = false;
          this.flashMessage.show(err.error.message, err.error.status);
        },
      });
  }
}
