import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirContaComponent } from './excluir-conta.component';

describe('ExcluirContaComponent', () => {
  let component: ExcluirContaComponent;
  let fixture: ComponentFixture<ExcluirContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirContaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
