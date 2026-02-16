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
import { MarcaVan } from '../../../../../types/MarcaVan';
import { FlashMessageService } from '../../../../service/flash-message.service';
import { ModeloVan, Van } from '../../../../../types/Van';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-van',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule,
    IonicModule,
    NgxMaskDirective,
  ],
  templateUrl: './editar-van.component.html',
  styleUrl: './editar-van.component.css',
})
export class EditarVanComponent implements OnChanges, OnInit {
  constructor(
    private fb: FormBuilder,
    private vanService: VanService,
    private flashMessage: FlashMessageService,
    private router: Router,
  ) {
    const anoAtual = new Date().getFullYear();

    for (let i = anoAtual; i >= 2000; i--) {
      this.anos.push(i);
    }
  }

  anos: number[] = [];

  @Input() van: Van | null = null;
  @Input() abrirModal: boolean = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() fecharModal = new EventEmitter<void>();

  formVan!: FormGroup;
  marcas: MarcaVan[] = [];
  modelos: ModeloVan[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;

    this.formVan = this.fb.group({
      numero: ['', Validators.required],
      marcaId: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      lugares: ['', Validators.required],
      ano: ['', Validators.required],
      renavam: ['', Validators.required],
    });

    this.vanService.buscarMarcas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.loading = false;
        this.marcas = res;
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });

    this.formVan.get('marcaId')?.valueChanges.subscribe((id) => {
      if (!id) return;

      this.loading = true;

      this.vanService.buscarModelos(id).subscribe({
        next: (res: any) => {
          console.log(res);
          this.loading = false;
          this.modelos = res;

          if (this.van?.modelo_van?.id) {
            this.formVan.get('modelo')?.setValue(this.van.modelo_van.id);
          }
        },
        error: (err) => {
          this.loading = false;
          this.flashMessage.show(err.error.message, err.error.status);
        },
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['van'] && this.van && this.formVan) {
      this.formVan.patchValue({
        numero: this.van.numero,
        marcaId: this.van.modelo_van?.marca_id,
        modelo: this.van.modelo_van?.id,
        placa: this.van.placa,
        lugares: this.van.lugares,
        ano: this.van.ano,
        renavam: this.van.renavam,
      });
    }
  }

  confirmarAcao() {
    this.confirmar.emit();
  }

  fechar() {
    this.fecharModal.emit();
  }

  atualizarVan() {
    const payload = this.formVan.value;
    const id = this.formVan.get('');

    this.loading = true;

    if (!this.van) return;

    this.vanService.atualizarVan(payload, this.van.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.flashMessage.show(res.message, res.status);
        this.router.navigate([`/vans/`]);
        this.abrirModal = false;
      },
      error: (err) => {
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
