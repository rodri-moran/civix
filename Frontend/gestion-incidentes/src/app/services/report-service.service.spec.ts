/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportServiceService } from './report-service.service';

describe('Service: ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportServiceService]
    });
  });

  it('should ...', inject([ReportServiceService], (service: ReportServiceService) => {
    expect(service).toBeTruthy();
  }));
});
