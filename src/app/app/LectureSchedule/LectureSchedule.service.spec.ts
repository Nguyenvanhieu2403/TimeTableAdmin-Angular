/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LectureScheduleService } from './LectureSchedule.service';

describe('Service: LectureSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureScheduleService]
    });
  });

  it('should ...', inject([LectureScheduleService], (service: LectureScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
