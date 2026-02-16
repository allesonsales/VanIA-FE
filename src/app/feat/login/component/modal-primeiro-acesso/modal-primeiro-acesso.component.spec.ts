import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrimeiroAcessoComponent } from './modal-primeiro-acesso.component';

describe('ModalPrimeiroAcessoComponent', () => {
  let component: ModalPrimeiroAcessoComponent;
  let fixture: ComponentFixture<ModalPrimeiroAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPrimeiroAcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
