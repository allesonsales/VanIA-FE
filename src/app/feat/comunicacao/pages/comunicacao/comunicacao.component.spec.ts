import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacaoComponent } from './comunicacao.component';

describe('ComunicacaoComponent', () => {
  let component: ComunicacaoComponent;
  let fixture: ComponentFixture<ComunicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
