/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagerAccountService } from './ManagerAccount.service';

describe('Service: ManagerAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerAccountService]
    });
  });

  it('should ...', inject([ManagerAccountService], (service: ManagerAccountService) => {
    expect(service).toBeTruthy();
  }));
});
