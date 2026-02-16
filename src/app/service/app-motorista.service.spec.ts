import { TestBed } from '@angular/core/testing';

import { AppMotoristaService } from './app-motorista.service';

describe('AppMotoristaService', () => {
  let service: AppMotoristaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMotoristaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
