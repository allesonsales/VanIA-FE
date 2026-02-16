import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRotaComponent } from './editar-rota.component';

describe('EditarRotaComponent', () => {
  let component: EditarRotaComponent;
  let fixture: ComponentFixture<EditarRotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
