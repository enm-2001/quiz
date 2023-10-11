import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/service/question.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent {
  category_id! : string
  questions! : any
  cname! : string
  questionData! : any
  constructor(private _route: ActivatedRoute, private registerService: RegisterService , private router: Router,private questionService: QuestionService, private toastr: ToastrService) { }

  loadQuestions(){
    this.questionService.getQuestions(this.category_id).subscribe(
      (response: any) => {
        this.questions = response.questions
        this.cname = response.cname
      },
      error => {
        console.log(error);
        
      }
    )

  }
  ngOnInit(){
    this.category_id = this._route.snapshot.params['category_id'];
    this.loadQuestions()
  }

  deleteQuestion(id: string){
    this.questionService.deleteQuestion(id).subscribe(
      response => {
        this.questions = this.questions.filter((ques: any) => ques.question_id !== id)
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

  updateQuestion(id: string){
    this.questionService.getQuestionById(id).subscribe(
      (response: any) => {
        this.questionData = response
        
        const navigationExtras: NavigationExtras = {
          state: {
            data: this.questionData,
          },
        };     
          console.log("navv",navigationExtras);
          
        this.router.navigate(['/add-question',this.category_id], navigationExtras);
      }
    )
  }
}
