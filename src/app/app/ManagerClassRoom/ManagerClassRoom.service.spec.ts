/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagerClassRoomService } from './ManagerClassRoom.service';

describe('Service: ManagerClassRoom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerClassRoomService]
    });
  });

  it('should ...', inject([ManagerClassRoomService], (service: ManagerClassRoomService) => {
    expect(service).toBeTruthy();
  }));
});
