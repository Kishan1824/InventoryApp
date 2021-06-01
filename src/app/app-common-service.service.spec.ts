import { TestBed } from '@angular/core/testing';

import { AppCommonServiceService } from './app-common-service.service';

describe('AppCommonServiceService', () => {
  let service: AppCommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCommonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
