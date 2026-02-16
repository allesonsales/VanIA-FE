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
import { DetalheEscolaComponent } from './feat/escolas/pages/detalhe-escola/detalhe-escola.component';
import { DetalheRotaComponent } from './feat/rotas/pages/detalhe-rota/detalhe-rota.component';
import { MotoristasComponent } from './feat/motoristas/pages/motoristas/motoristas.component';
import { DetalheMotoristaComponent } from './feat/motoristas/pages/detalhe-motorista/detalhe-motorista.component';
import { DetalheAlunoComponent } from './feat/alunos/pages/detalhe-aluno/detalhe-aluno.component';
import { DetalheFinanceiroComponent } from './feat/financeiro/pages/detalhe-financeiro/detalhe-financeiro.component';
import { AjudaComponent } from './feat/ajuda/page/ajuda/ajuda.component';
import { ViagensComponent } from './feat/viagens/pages/viagens/viagens.component';
import { DetalheViagemComponent } from './feat/viagens/pages/detalhe-viagem/detalhe-viagem.component';
import { HomeComponent } from './apps/motorista/pages/home/home.component';
import { ListaViagensComponent } from './apps/motorista/pages/lista-viagens/lista-viagens.component';
import { IniciarViagemComponent } from './apps/motorista/pages/iniciar-viagem/iniciar-viagem.component';

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
      { path: 'motorista', component: HomeComponent },
      { path: 'motorista/listar-viagens', component: ListaViagensComponent },
      {
        path: 'motorista/iniciar/:id',
        component: IniciarViagemComponent,
      },
      { path: 'alunos', component: AlunosComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'comunicacao', component: ComunicacaoComponent },
      { path: 'motoristas', component: MotoristasComponent },
      { path: 'cadastrar-aluno', component: CadastrarAlunoComponent },
      { path: 'cadastrar-escola', component: CadastrarEscolaComponent },
      { path: 'cadastrar-van', component: CadastrarVanComponent },
      { path: 'cadastrar-motorista', component: CadastrarMotoristaComponent },
      { path: 'cadastrar-rota', component: CadastrarRotaComponent },
      { path: 'rotas', component: RotasComponent },
      { path: 'vans', component: VansComponent },
      { path: 'escolas', component: EscolasComponent },
      { path: 'ajuda', component: AjudaComponent },
      { path: 'viagens', component: ViagensComponent },
      { path: 'vans/:id', component: DetalheVanComponent },
      { path: 'escolas/:id', component: DetalheEscolaComponent },
      { path: 'motorista/:id', component: DetalheMotoristaComponent },
      { path: 'rotas/:id', component: DetalheRotaComponent },
      { path: 'alunos/:id', component: DetalheAlunoComponent },
      { path: 'financeiro/:id', component: DetalheFinanceiroComponent },
      { path: 'viagem/:id', component: DetalheViagemComponent },
    ],
  },
];
