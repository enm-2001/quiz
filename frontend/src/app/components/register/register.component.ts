import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // user = { name: '', email: '', username: '', password: '', role: '' };
  user: any
  
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.user = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      role: new FormControl('', Validators.required)
    })
  }

  get name(){
    return this.user.get('name')
  }

  get email(){
    return this.user.get('email')
  }

  get username(){
    return this.user.get('username')
  }

  get password(){
    return this.user.get('password')
  }

  get role(){
    return this.user.get('role')
  }

  onSubmit() {
    console.log(this.user.value);
    
    this.registerService.saveUser(this.user.value).subscribe(
      (response: any) => {
        this.registerService.loggedIn = true;

        if (response.newUser.role == 'user') {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/admin']);
        }
        this.registerService.setToken(response.token);
      },
      (error) => {
        if (error.status == 409) {
          this.toastr.error('User already exists');
        } else {
          this.toastr.error('Try again');
        }
      }
    );
  }
}
