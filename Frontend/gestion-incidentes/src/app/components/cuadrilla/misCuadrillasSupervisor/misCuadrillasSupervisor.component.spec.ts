/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MisCuadrillasSupervisorComponent } from './misCuadrillasSupervisor.component';

describe('MisCuadrillasSupervisorComponent', () => {
  let component: MisCuadrillasSupervisorComponent;
  let fixture: ComponentFixture<MisCuadrillasSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCuadrillasSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCuadrillasSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
