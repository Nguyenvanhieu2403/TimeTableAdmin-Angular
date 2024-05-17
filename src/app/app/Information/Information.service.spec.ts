/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InformationService } from './Information.service';

describe('Service: Information', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformationService]
    });
  });

  it('should ...', inject([InformationService], (service: InformationService) => {
    expect(service).toBeTruthy();
  }));
});
