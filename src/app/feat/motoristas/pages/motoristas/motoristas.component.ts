import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { Motorista } from '../../../../../types/Motorista';
import { MotoristaService } from '../../../../service/motorista.service';

@Component({
  selector: 'app-motoristas',
  imports: [HeaderComponent, TabelaComponent],
  templateUrl: './motoristas.component.html',
  styleUrl: './motoristas.component.css',
})
export class MotoristasComponent implements OnInit {
  constructor(private motoristaService: MotoristaService) {}
  motoristas: Motorista[] = [];

  ngOnInit(): void {
    document.title = 'VanIA | Motoristas';
    this.motoristaService.buscarMotoristas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.motoristas = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
