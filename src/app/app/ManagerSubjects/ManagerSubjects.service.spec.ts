/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagerSubjectsService } from './ManagerSubjects.service';

describe('Service: ManagerSubjects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerSubjectsService]
    });
  });

  it('should ...', inject([ManagerSubjectsService], (service: ManagerSubjectsService) => {
    expect(service).toBeTruthy();
  }));
});
