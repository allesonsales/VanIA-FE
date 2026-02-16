import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoViagemComponent } from './botao-viagem.component';

describe('BotaoViagemComponent', () => {
  let component: BotaoViagemComponent;
  let fixture: ComponentFixture<BotaoViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
