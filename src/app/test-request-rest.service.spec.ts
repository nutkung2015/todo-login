import { TestBed } from '@angular/core/testing';

import { TestRequestRestService } from './test-request-rest.service';

describe('TestRequestRestService', () => {
  let service: TestRequestRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestRequestRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
