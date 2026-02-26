import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEsqueciSenhaComponent } from './modal-esqueci-senha.component';

describe('ModalEsqueciSenhaComponent', () => {
  let component: ModalEsqueciSenhaComponent;
  let fixture: ComponentFixture<ModalEsqueciSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEsqueciSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEsqueciSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
