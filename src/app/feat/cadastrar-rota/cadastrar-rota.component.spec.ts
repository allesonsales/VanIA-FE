import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarRotaComponent } from './cadastrar-rota.component';

describe('CadastrarRotaComponent', () => {
  let component: CadastrarRotaComponent;
  let fixture: ComponentFixture<CadastrarRotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarRotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
