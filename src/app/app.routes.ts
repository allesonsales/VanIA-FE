import { Routes } from '@angular/router';
import { LoginComponent } from './feat/login/pages/login.component';
import { DashboardComponent } from './feat/dashboard/pages/dashboard/dashboard.component';
import { AlunosComponent } from './feat/alunos/pages/alunos/alunos.component';
import { FinanceiroComponent } from './feat/financeiro/pages/financeiro/financeiro.component';
import { ComunicacaoComponent } from './feat/comunicacao/pages/comunicacao/comunicacao.component';
import { CadastrarAlunoComponent } from './feat/cadastrar-aluno/cadastrar-aluno.component';
import { CadastrarVanComponent } from './feat/cadastrar-van/cadastrar-van.component';
import { CadastrarEscolaComponent } from './feat/cadastrar-escola/cadastrar-escola.component';
import { CadastrarMotoristaComponent } from './feat/cadastrar-motorista/cadastrar-motorista.component';
import { CadastrarRotaComponent } from './feat/cadastrar-rota/cadastrar-rota.component';
import { RotasComponent } from './feat/rotas/pages/rotas/rotas.component';
import { VansComponent } from './feat/vans/pages/vans/vans.component';
import { EscolasComponent } from './feat/escolas/pages/escolas/escolas.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { DetalheVanComponent } from './feat/vans/pages/detalhe-van/detalhe-van.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alunos', component: AlunosComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'comunicacao', component: ComunicacaoComponent },
      { path: 'cadastrar-aluno', component: CadastrarAlunoComponent },
      { path: 'cadastrar-escola', component: CadastrarEscolaComponent },
      { path: 'cadastrar-van', component: CadastrarVanComponent },
      { path: 'cadastrar-motorista', component: CadastrarMotoristaComponent },
      { path: 'cadastrar-rota', component: CadastrarRotaComponent },
      { path: 'rotas', component: RotasComponent },
      { path: 'vans', component: VansComponent },
      { path: 'escolas', component: EscolasComponent },
      { path: 'aluno/:id', component: AlunosComponent },
      { path: 'vans/:id', component: DetalheVanComponent },
    ],
  },
];
