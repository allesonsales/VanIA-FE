import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarViagemComponent } from './iniciar-viagem.component';

describe('IniciarViagemComponent', () => {
  let component: IniciarViagemComponent;
  let fixture: ComponentFixture<IniciarViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
