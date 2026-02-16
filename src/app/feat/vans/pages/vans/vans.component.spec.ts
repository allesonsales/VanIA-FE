import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VansComponent } from './vans.component';

describe('VansComponent', () => {
  let component: VansComponent;
  let fixture: ComponentFixture<VansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
