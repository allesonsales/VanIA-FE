import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRotaComponent } from './card-rota.component';

describe('CardRotaComponent', () => {
  let component: CardRotaComponent;
  let fixture: ComponentFixture<CardRotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
