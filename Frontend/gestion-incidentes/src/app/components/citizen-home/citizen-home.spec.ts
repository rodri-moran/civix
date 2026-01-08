import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenHome } from './citizen-home';

describe('CitizenHome', () => {
  let component: CitizenHome;
  let fixture: ComponentFixture<CitizenHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
