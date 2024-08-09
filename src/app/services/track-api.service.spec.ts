import { TestBed } from '@angular/core/testing';

import { trackAPIService } from './track-api.service';

describe('trackAPIService', () => {
  let service: trackAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(trackAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
