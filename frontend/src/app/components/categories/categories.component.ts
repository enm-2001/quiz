import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuestionService } from 'src/app/service/question.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories = [{category_id: '', cname: '', cdesc: '', no_of_quiz: '', no_of_ques: ''}]
  userLoggedIn! : boolean

  constructor(private categoryService: CategoryService, private questionService: QuestionService, private registerService: RegisterService, private  router: Router) { }

  loadCategories(){
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = [...response]
        console.log(response);
        
        this.categories.forEach((cat: any) => {
          this.questionService.getQuestions(cat.category_id).subscribe(
            (response: any) => {
              
              cat['no_of_ques'] = response.questions.length
            }
          )  
            
        });
      },
      error => {
        console.log(error);    
      }
    )
  }
  ngOnInit(){
    this.loadCategories()
    this.userLoggedIn = this.registerService.loggedIn
  }

  startQuiz(category_id: string){

    if(!this.userLoggedIn){

      if (this.registerService.navigationExtras && this.registerService.navigationExtras.state) {
        this.registerService.navigationExtras.state['data'] = "Please login to continue with the quiz..";
        this.router.navigate(['/alert'], this.registerService.navigationExtras)
      }
  
    }
    else{
      this.router.navigate([`/start-quiz/${category_id}`])
    }
  }
}
