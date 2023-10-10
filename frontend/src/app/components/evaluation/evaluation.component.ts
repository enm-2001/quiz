import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit{
  
  // evaluation = [{ title: 'attemptedQues', score: 0}, { title: 'marksTitle', score: 0}, { title: 'correctQues', score: 0}]
  attemptedQues!: string
  marksTitle! : string
  correctQues! : string
  attempted = 0
  marks = 0
  correctAnswers = 0
  questions = 0

  constructor() { }

  ngOnInit(){
    this.correctAnswers = history.state.correctAnswers
    this.attempted = history.state.attempted
    this.marks = history.state.marks
    this.questions = history.state.questions
  }
}
