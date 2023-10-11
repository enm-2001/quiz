import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { name: '', email: '', username: '', password: '', role: 'user' };

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  onSubmit(f: NgForm) {

    this.registerService.saveUser(this.user).subscribe(
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
