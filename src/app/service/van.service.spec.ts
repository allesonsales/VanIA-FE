import { TestBed } from '@angular/core/testing';

import { VanService } from './van.service';

describe('VanServiceService', () => {
  let service: VanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
