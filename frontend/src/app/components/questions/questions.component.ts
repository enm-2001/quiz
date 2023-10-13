import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit{

  category_id! : string
  questions! : Array<any>
  marks = 0
  correctAnswers = 0
  attempted = 0
  quiz! : any
  user_id! : string
  cname! : string
  constructor(private _route: ActivatedRoute, private quizService: QuizService, private registerService: RegisterService, private router: Router, private questionService: QuestionService, private toastr: ToastrService, private categoryService: CategoryService) { }

  loadQuestions(){
    this.questionService.getQuestions(this.category_id).subscribe(
      (response: any) => {
        this.questions = response.questions
        this.cname = response.cname
        console.log(this.questions.length);
        
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = ''
        });
        
      },
      error => {
        console.log(error);
        this.toastr.error('Error!!', 'Error in loading questions');
      }
    )

  }
  ngOnInit(){
    this.category_id = this._route.snapshot.params['category_id'];
    const user = this.registerService.getUser() as any
    if(user){
      this.user_id = user.user_id
    }
    this.loadQuestions()
  }

  async evalQuiz(){
    this.questions.forEach((q: any) => {
      if(q.givenAnswer != ""){
        this.attempted ++ 
      }
      if(q.options.length != 0){
        if(q.givenAnswer == q.answer){

          this.correctAnswers++
          this.marks++
        }
      }
      else{
        if(q.givenAnswer.trim().toLowerCase() == q.answer){

          this.correctAnswers++
          this.marks++
        }
      }
      
    });
    this.quiz = {
      category_id: this.category_id,
      user_id: this.user_id,
      marks: this.marks
    }
    this.quizService.addQuiz(this.quiz).subscribe({
      next:(response) => {

        console.log("ghjkl");
      },
      error:(error) => {
        console.log(error);
        
      }
    }
    )
    
  }
  
  async onSubmit(f:NgForm){

    await this.evalQuiz()
    await this.categoryService.updateQuiz(this.category_id, {no_of_quiz: 1}).subscribe(
      response => {
        
        const navigationExtras : NavigationExtras = {
          state: {
            correctAnswers: this.correctAnswers,
            attempted: this.attempted,
            marks: this.marks,
            questions: this.questions.length
          }
        }
        
        this.router.navigate(['/evaluation'], navigationExtras)
      },
      error => {
        if(error.status == 403){
          if (this.registerService.navigationExtras && this.registerService.navigationExtras.state) {
            this.registerService.navigationExtras.state['data'] = "Your session is expired. Please login again to continue..";
            this.router.navigate(['/alert'], this.registerService.navigationExtras)
            this.registerService.clearToken()
          }
        }
        else{
          this.toastr.error('Try again')
        }
        
      }
    )

  }

}
