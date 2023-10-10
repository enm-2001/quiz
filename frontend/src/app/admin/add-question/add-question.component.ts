import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/service/question.service';
import { RegisterService } from 'src/app/service/register.service';
// import { NgZone } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddQuestionComponent implements OnInit {

  // category_id! : string
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
      // console.log("history",history.state.data);
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

  onSubmit(f: NgForm){
    // console.log(f.value);
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
  // trackByFn(index: number, item: string): string {
  //   return item; // Assuming each option is a unique string
  // }
  addOption(){
      this.options.push('');  
  }
  removeOption(i : number){
    this.options.splice(i, 1)
    console.log(this.options);
    
  }
}