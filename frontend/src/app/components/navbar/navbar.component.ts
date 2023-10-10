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
  // collapseNav! : boolean
  categories = [{category_id: '', cname: '', cdesc: '', no_of_quiz: ''}]
  // @ViewChild('toggleBtn') toggleBtn!: ElementRef
  @ViewChild('collapseNav') collapseNav!: ElementRef

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
  // collapse(){
  //   this.collapseNav = false
  // }

  // collapse(){

  //   const element = document.getElementById("navbarSupportedContent")
  //   console.log(element?.classList);
    
  //   if(element?.classList.contains("show")){
  //     element.classList.remove("show")
  //   }
  //   else{
  //     element?.classList.add("show")
  //   }
  //   // console.log("hii");
    
  //   // console.log(this.collapseNav.nativeElement.classList.contains("show"))
  //   // if(this.collapseNav.nativeElement.classList.contains('show')){
  //   //   console.log("one");
  //   //   this.collapseNav.nativeElement.classList.remove('show')
  //   // }
  //   // else{
  //   //   console.log("two");
  //   //   this.collapseNav.nativeElement.classList.add('show')
  //   // }
  //   // console.log("called");
    
  //   // const element = document.getElementById('navbarSupportedContent')
  //   // if(element?.classList.contains("show")){
  //   //   console.log("one");
      
  //   //   element.classList.remove('show')
  //   // }
  //   // else{
  //   //   console.log("two");
      
  //   //   element?.classList.add("show")
  //   // }
  // }
}

