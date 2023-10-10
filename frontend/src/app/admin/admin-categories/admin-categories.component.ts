import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { QuestionService } from 'src/app/service/question.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent {
  categories! : any

  categoryData! : any
  constructor(private categoryService: CategoryService, private questionService: QuestionService, private registerService: RegisterService, private toastr: ToastrService, private router: Router) { }

  loadCategories(){
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = [...response]
        this.categories.forEach((cat: any) => {
          this.questionService.getQuestions(cat.category_id).subscribe(
            (response: any) => {
              
              cat['no_of_ques'] = response.questions.length
            }
          )  
          // console.log(this.categories);
            
        });
      },
      error => {
        console.log(error);
        
      }
    )
  }
  
  ngOnInit(){
    this.loadCategories()
  }

  deleteCategory(id: string){
    this.categoryService.deleteCategory(id).subscribe(
      response => {
        this.categories = this.categories.filter((cat: any) => cat.category_id !== id)
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

  updateCategory(id: string){
    // console.log("idd",id);
    
    this.categoryService.getCategoryById(id).subscribe(
      (response: any) => {
        this.categoryData = response
        // console.log(response);
        const navigationExtras: NavigationExtras = {
          state: {
            data: this.categoryData,
          },
        };
        // console.log(navigationExtras);    
        this.router.navigate(['/add-category'], navigationExtras);
      }
    )
  }
}
