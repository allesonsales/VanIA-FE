import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEscolaComponent } from './detalhe-escola.component';

describe('DetalheEscolaComponent', () => {
  let component: DetalheEscolaComponent;
  let fixture: ComponentFixture<DetalheEscolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEscolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
