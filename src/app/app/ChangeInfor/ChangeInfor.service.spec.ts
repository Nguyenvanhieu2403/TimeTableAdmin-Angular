/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChangeInforService } from './ChangeInfor.service';

describe('Service: ChangeInfor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeInforService]
    });
  });

  it('should ...', inject([ChangeInforService], (service: ChangeInforService) => {
    expect(service).toBeTruthy();
  }));
});
