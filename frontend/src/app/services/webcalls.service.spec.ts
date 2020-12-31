import { TestBed } from '@angular/core/testing';

import { WebcallsService } from './webcalls.service';

describe('WebcallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebcallsService = TestBed.get(WebcallsService);
    expect(service).toBeTruthy();
  });
});
