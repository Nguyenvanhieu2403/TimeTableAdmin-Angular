/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleRegisteredService } from './ScheduleRegistered.service';

describe('Service: ScheduleNotRegistered', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleRegisteredService]
    });
  });

  it('should ...', inject([ScheduleRegisteredService], (service: ScheduleRegisteredService) => {
    expect(service).toBeTruthy();
  }));
});
