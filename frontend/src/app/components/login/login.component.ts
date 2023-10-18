import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // user = { username: '', password: '' };
  user: any
  constructor(private registerService: RegisterService, private router: Router, private toastr: ToastrService) { 
    this.user = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  
  get username(){
    return this.user.get('username')
  }

  get password(){
    return this.user.get('password')
  }
  onSubmit(){
    this.registerService.loginUser(this.user.value).subscribe(
      (response: any) => {
        
        this.registerService.loggedIn = true
        if(response.user.role == 'user'){
          this.router.navigate([''])
        }
        else{
          this.router.navigate(['/admin'])
        }
        this.registerService.setToken(response.token)
      },
      error => {
        if(error.status == 409){
          this.toastr.error('User does not exist')
        }
        else if(error.status == 401) {
          this.toastr.error('Incorrect password')
        }
        else{
          this.toastr.error('Try again')
        }
      }
    )  
  }
}
