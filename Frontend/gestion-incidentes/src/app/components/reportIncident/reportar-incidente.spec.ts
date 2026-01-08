import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarIncidente } from './reportar-incidente';

describe('ReportarIncidente', () => {
  let component: ReportarIncidente;
  let fixture: ComponentFixture<ReportarIncidente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportarIncidente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportarIncidente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
