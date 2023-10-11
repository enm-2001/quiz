import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  userLoggedIn = false
  role! : string

  categories = [{category_id: '', cname: '', cdesc: '', no_of_quiz: ''}]

  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  // @ViewChild('collapseNav') collapseNav!: ElementRef;

  constructor(private registerService: RegisterService, private router: Router, private categoryService: CategoryService) {}
  ngOnInit() {
    const token = this.registerService.getToken()
    if(token){
      this.userLoggedIn = true
      this.role = this.registerService.getRole()
    }
    else{
      this.userLoggedIn = false
    }
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = [...response]   
        // console.log(this.categories);
             
      }
    )
  }

  ngDoCheck(){
    const token = this.registerService.getToken()
    if(token){
      this.userLoggedIn = true
      this.role = this.registerService.getRole()
    }
    else{
      this.userLoggedIn = false
    }
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
  
  logout(){
    this.registerService.loggedIn = false
    this.registerService.clearToken()
    this.role = ''
    this.router.navigate([''])
  }
  
}

