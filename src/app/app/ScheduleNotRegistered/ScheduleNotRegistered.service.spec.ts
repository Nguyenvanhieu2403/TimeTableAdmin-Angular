/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleNotRegisteredService } from './ScheduleNotRegistered.service';

describe('Service: ScheduleNotRegistered', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleNotRegisteredService]
    });
  });

  it('should ...', inject([ScheduleNotRegisteredService], (service: ScheduleNotRegisteredService) => {
    expect(service).toBeTruthy();
  }));
});
