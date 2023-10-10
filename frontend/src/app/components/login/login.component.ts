import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { username: '', password: '' };

  constructor(private registerService: RegisterService, private router: Router, private toastr: ToastrService) { }
  
  onSubmit(f: NgForm){
    this.registerService.loginUser(this.user).subscribe(
      (response: any) => {
        // console.log(response);
        
        this.registerService.loggedIn = true
        if(response.user.role == 'user'){
          // this.registerService.userRole = 'user'
          this.router.navigate([''])
        }
        else{
          // this.registerService.userRole = 'admin'
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
        f.resetForm()
      }
    )  
  }
}
