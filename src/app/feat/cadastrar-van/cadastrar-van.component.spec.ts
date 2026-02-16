import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVanComponent } from './cadastrar-van.component';

describe('CadastrarVanComponent', () => {
  let component: CadastrarVanComponent;
  let fixture: ComponentFixture<CadastrarVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarVanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
