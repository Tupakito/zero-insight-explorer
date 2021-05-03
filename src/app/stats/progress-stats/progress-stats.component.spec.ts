import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressStatsComponent } from './progress-stats.component';

describe('ProgressStatsComponent', () => {
  let component: ProgressStatsComponent;
  let fixture: ComponentFixture<ProgressStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
