import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMotoristaComponent } from './detalhe-motorista.component';

describe('DetalheMotoristaComponent', () => {
  let component: DetalheMotoristaComponent;
  let fixture: ComponentFixture<DetalheMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheMotoristaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
