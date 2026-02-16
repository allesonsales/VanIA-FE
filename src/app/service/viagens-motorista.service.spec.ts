import { TestBed } from '@angular/core/testing';

import { ViagensMotoristaService } from './viagens-motorista.service';

describe('ViagensMotoristaService', () => {
  let service: ViagensMotoristaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViagensMotoristaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
