/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { IventoryServiceService } from './iventory-service.service';

describe('Service: IventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IventoryServiceService]
    });
  });

  it('should ...', inject([IventoryServiceService], (service: IventoryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
