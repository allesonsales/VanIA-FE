import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Van } from '../../../types/Van';
import { VanService } from '../../service/van.service';
import { MarcaVan } from '../../../types/MarcaVan';
import { ModeloVan } from '../../../types/ModeloVan';
import { FlashMessageService } from '../../service/flash-message.service';
import { NgxMaskDirective } from 'ngx-mask';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-cadastrar-van',
  imports: [
    HeaderComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    LoadingComponent,
  ],
  templateUrl: './cadastrar-van.component.html',
  styleUrl: './cadastrar-van.component.css',
})
export class CadastrarVanComponent implements OnInit {
  formVan!: FormGroup;
  marcas: MarcaVan[] = [];
  marcaSelecionada: MarcaVan | null = null;
  modelos: ModeloVan[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessageService,
    private vanService: VanService,
  ) {
    const anoAtual = new Date().getFullYear();

    for (let i = anoAtual; i >= 2000; i--) {
      this.anos.push(i);
    }
  }

  anos: number[] = [];

  ngOnInit(): void {
    this.vanService.buscarMarcas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.marcas = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.formVan = this.fb.group({
      numero: ['', Validators.required],
      renavam: ['', Validators.required],
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      lugares: ['', Validators.required],
      ano: ['', Validators.required],
      marcaId: ['', Validators.required],
    });

    this.formVan.get(`marcaId`)?.valueChanges.subscribe((id) => {
      if (!id) return;

      this.loading = true;

      this.vanService.buscarModelos(Number(id)).subscribe({
        next: (res: any) => {
          console.log(res);
          this.modelos = res;
          this.loading = false;
        },
        error: (err) => {
          this.flashMessage.show(err.error.message, err.error.status);
        },
      });
    });
  }

  validarFormulario() {
    const payload = this.formVan.value;

    this.loading = true;

    if (this.formVan.invalid) {
      this.flashMessage.show('Preencha todos os campos!', 'error');
      this.loading = false;
      return;
    }

    this.vanService.cadastrarVan(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.flashMessage.show(res.message, res.status);
        this.formVan.reset();
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.flashMessage.show(err.error.message, err.error.status);
      },
    });
  }
}
