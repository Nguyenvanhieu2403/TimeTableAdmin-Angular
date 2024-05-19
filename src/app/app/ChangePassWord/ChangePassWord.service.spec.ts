/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChangePassWordService } from './ChangePassWord.service';

describe('Service: ChangePassWord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePassWordService]
    });
  });

  it('should ...', inject([ChangePassWordService], (service: ChangePassWordService) => {
    expect(service).toBeTruthy();
  }));
});
