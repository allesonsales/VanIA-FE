import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { Aluno } from '../../../../../types/Aluno';
import { AlunoService } from '../../../../service/aluno.service';

@Component({
  selector: 'app-alunos',
  imports: [IonicModule, HeaderComponent, TabelaComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css',
})
export class AlunosComponent implements OnInit {
  constructor(private alunoService: AlunoService) {}

  alunos: Aluno[] = [];

  ngOnInit(): void {
    document.title = 'VanIA | Alunos';
    this.alunoService.buscarAlunos().subscribe({
      next: (res: any) => {
        console.log(res);
        this.alunos = res.alunosFlat;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
