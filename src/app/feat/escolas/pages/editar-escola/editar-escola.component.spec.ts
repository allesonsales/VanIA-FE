import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEscolaComponent } from './editar-escola.component';

describe('EditarEscolaComponent', () => {
  let component: EditarEscolaComponent;
  let fixture: ComponentFixture<EditarEscolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEscolaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
