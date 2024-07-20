import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadorDashboardComponent } from './empleador-dashboard.component';

describe('EmpleadorDashboardComponent', () => {
  let component: EmpleadorDashboardComponent;
  let fixture: ComponentFixture<EmpleadorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
