import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{

  users! : Array<any>
  constructor(private userService: UserService, private toastr: ToastrService, private registerService: RegisterService, private router: Router) { }

  ngOnInit(){
    this.userService.getUsers().subscribe(
    (response: any) => {
      this.users = [...response]
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
    })
  }

  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe(
      response => {
        this.users = this.users.filter((user: any) => user.user_id !== id)
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
