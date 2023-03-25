import { TestBed } from '@angular/core/testing';

import { ServsService } from './servs.service';

describe('ServsService', () => {
  let service: ServsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
