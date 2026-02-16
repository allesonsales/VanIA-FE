import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheViagemComponent } from './detalhe-viagem.component';

describe('DetalheViagemComponent', () => {
  let component: DetalheViagemComponent;
  let fixture: ComponentFixture<DetalheViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
