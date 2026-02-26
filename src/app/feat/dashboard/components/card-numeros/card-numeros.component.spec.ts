import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNumerosComponent } from './card-numeros.component';

describe('CardNumerosComponent', () => {
  let component: CardNumerosComponent;
  let fixture: ComponentFixture<CardNumerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNumerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
