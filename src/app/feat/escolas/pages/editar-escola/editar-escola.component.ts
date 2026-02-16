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
import { MarcaVan } from '../../../../../types/MarcaVan';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { ModeloVan } from '../../../../../types/Van';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { Escola } from '../../../../../types/Escola';
import { EscolaService } from '../../../../service/escola.service';
import buscarCep from '../../../../shared/utils/buscarCep';

@Component({
  selector: 'app-editar-escola',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule,
    IonicModule,
    NgxMaskDirective,
  ],
  templateUrl: './editar-escola.component.html',
  styleUrl: './editar-escola.component.css',
})
export class EditarEscolaComponent implements OnChanges, OnInit {
  constructor(
    private fb: FormBuilder,
    private escolaService: EscolaService,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {
    const anoAtual = new Date().getFullYear();

    for (let i = anoAtual; i >= 2000; i--) {
      this.anos.push(i);
    }
  }

  anos: number[] = [];

  @Input() escola: Escola | null = null;
  @Input() abrirModal: boolean = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() fecharModal = new EventEmitter<void>();

  formEscola!: FormGroup;
  marcas: MarcaVan[] = [];
  modelos: ModeloVan[] = [];
  loading = false;

  ngOnInit(): void {
    document.title = `${this.escola?.nome}`;
    this.loading = true;

    this.formEscola = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      tipo: ['', Validators.required],
    });

    this.loading = false;

    console.log('detalhe-escola', this.escola);
  }

  ngOnChanges(changes: SimpleChanges): void {
    document.title = `Escola - ${this.escola?.nome}`;
    if (changes['escola'] && this.escola && this.formEscola) {
      this.formEscola.patchValue({
        nome: this.escola.nome,
        telefone: this.escola.telefone,
        numero: this.escola.endereco?.numero,
        cep: this.escola.endereco?.cep,
        rua: this.escola.endereco?.rua,
        tipo: this.escola.tipo,
        bairro: this.escola.endereco?.bairro,
        cidade: this.escola.endereco?.cidade,
        estado: this.escola.endereco?.estado,
      });
    }
  }

  async consultarCep() {
    const cep = this.formEscola.get('cep')?.value;
    const endereco = await buscarCep(cep);
    console.log(endereco);
    if (endereco) {
      this.formEscola.patchValue({
        cep: endereco.cep,
        rua: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.estado,
      });
    }
  }

  confirmarAcao() {
    this.confirmar.emit();
  }

  fechar() {
    this.fecharModal.emit();
  }

  atualizarEscola() {
    const payload = this.formEscola.value;

    this.loading = true;

    if (!this.escola) return;

    this.escolaService.atualizarEscola(payload, this.escola.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.router.navigate([`/escola/${this.escola?.id}`]);
        this.abrirModal = false;
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
