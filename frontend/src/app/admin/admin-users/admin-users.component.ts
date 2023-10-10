import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{

  users! : any
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(){
    this.userService.getUsers().subscribe(
    (response: any) => {
      this.users = [...response]
    },
    error => {
      if(error.status == 403){
        alert("Your session is expired. Please login again to continue..")
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
          alert("Your session is expired. Please login again to continue..")
        }
        else{
          this.toastr.error('Try again')
        }
      }

    )
  }
}
