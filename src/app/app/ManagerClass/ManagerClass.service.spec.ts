/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagerClassService } from './ManagerClass.service';

describe('Service: ManagerClass', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerClassService]
    });
  });

  it('should ...', inject([ManagerClassService], (service: ManagerClassService) => {
    expect(service).toBeTruthy();
  }));
});
