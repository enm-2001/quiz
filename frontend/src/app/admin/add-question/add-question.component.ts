import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/service/question.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  count = 1
  type! : string
  options: string[] = [];
  question = {question: '', answer: '', category_id: '', options: this.options}
  dataNotEmpty! : boolean
  questionDataId! : string

  constructor(private _route: ActivatedRoute, private registerService: RegisterService, private questionService: QuestionService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(){
    this.question.category_id = this._route.snapshot.params['category_id'];
    if(history.state.data){
      this.dataNotEmpty = true
      
      this._route.paramMap.subscribe(params => { 
        const dataPassed = history.state.data;
        if(dataPassed.options.length != 0){
          this.type = 'options'
          this.options = dataPassed.options
        }
        else{
          this.type = 'input'
        }
        this.questionDataId = dataPassed.question_id
        this.question = {...dataPassed}
      });

    }
  }

  trackFocus(event: FocusEvent) {
    event.preventDefault();
  }

  onSubmit(f: NgForm){
    this.question = {...this.question, options: this.options}
    if(this.type == 'input'){
      this.question.options = []
      this.question = {...this.question, answer: this.question.answer.trim().toLowerCase()}
    }
    if(this.dataNotEmpty){
      this.questionService.updateQuestion(this.questionDataId, this.question).subscribe(
        response => {
          this.toastr.success("Question updated")
          this.router.navigate([`/admin-questions/${this.question.category_id}`])
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
    else{
      
      
      this.questionService.createQuestion(this.question).subscribe(
        response => {
          this.toastr.success("Question added to the category")
          this.router.navigate([`/admin-questions/${this.question.category_id}`])
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
  addOption(){
      this.options.push('');  
  }
  removeOption(i : number){
    this.options.splice(i, 1)
    console.log(this.options);
    
  }

  onInputBlur(event: any, i: number){
    this.options[i] = event.target.value
  }
}
