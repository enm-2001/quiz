import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

    category = {cname: '', cdesc: '', no_of_quiz: 0}
    categoryDataId! : string
    dataNotEmpty! : boolean
    constructor(private categoryService: CategoryService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private registerService: RegisterService) { }

    ngOnInit(){
      // console.log(this.route.snapshot);
      
      if(history.state.data){
        // console.log("hiii");
        
        this.route.paramMap.subscribe(params => { 
          const dataPassed = history.state.data;

          if(Object.keys(history.state.data).length !=0){
            this.dataNotEmpty = true
          }
          this.categoryDataId = dataPassed.category_id
          this.category = {...dataPassed}
        });

      }
    }
    onSubmit(f: NgForm){
      // console.log(this.route.snapshot.data);
      
      if(this.dataNotEmpty){
        
        this.categoryService.updateCategory(this.categoryDataId, this.category).subscribe(
          response => {
            // console.log("Response");
            
            f.resetForm()
            this.toastr.success('Category updated successfully.')
            this.router.navigate(['/admin-categories'])
          },
          error => {
            // console.log("error");
            
            // console.log(this.registerService);
            
            if(error.status == 403){
              if (this.registerService.navigationExtras && this.registerService.navigationExtras.state) {
                this.registerService.navigationExtras.state['data'] = "Your session is expired. Please login again to continue..";
                this.router.navigate(['/alert'], this.registerService.navigationExtras)
                this.registerService.clearToken()
              }
              // alert("Your session is expired. Please login again to continue..")
            }
            else{
              this.toastr.error('Try again')
            }
          }
        )
      }
      else{

        this.categoryService.createCategory(this.category).subscribe(
          response => {
            f.resetForm()
            this.toastr.success('Category created successfully.')
            this.router.navigate(['/admin-categories'])
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
}
