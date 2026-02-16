import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheVanComponent } from './detalhe-van.component';

describe('DetalheVanComponent', () => {
  let component: DetalheVanComponent;
  let fixture: ComponentFixture<DetalheVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheVanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
