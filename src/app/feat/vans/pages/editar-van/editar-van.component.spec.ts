import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVanComponent } from './editar-van.component';

describe('EditarVanComponent', () => {
  let component: EditarVanComponent;
  let fixture: ComponentFixture<EditarVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
