/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleAllService } from './ScheduleAll.service';

describe('Service: ScheduleAll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleAllService]
    });
  });

  it('should ...', inject([ScheduleAllService], (service: ScheduleAllService) => {
    expect(service).toBeTruthy();
  }));
});
