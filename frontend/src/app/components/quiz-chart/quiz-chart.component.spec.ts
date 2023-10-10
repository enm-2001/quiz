import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizChartComponent } from './quiz-chart.component';

describe('QuizChartComponent', () => {
  let component: QuizChartComponent;
  let fixture: ComponentFixture<QuizChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizChartComponent]
    });
    fixture = TestBed.createComponent(QuizChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
