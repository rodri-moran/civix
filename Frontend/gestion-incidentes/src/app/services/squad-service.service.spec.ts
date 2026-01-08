/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuadServiceService } from './suad-service.service';

describe('Service: SuadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuadServiceService]
    });
  });

  it('should ...', inject([SuadServiceService], (service: SuadServiceService) => {
    expect(service).toBeTruthy();
  }));
});
