import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import jwt_decode from 'jwt-decode'
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  user! : any
  user_id! : string
  profile! : any
  imageSrc! : any
  @ViewChild('fileInput') fileInput: any;
  constructor(private registerService: RegisterService, private userService: UserService, private toastr: ToastrService, private router: Router){ }
  
  getUser(){

    this.userService.getUserById(this.user_id).subscribe(
      response => {
        this.profile = response
        this.imageSrc = this.userService.getImageUrl(this.profile.avatar)
    },
      error => {
        console.log(error);
        
      }
    )
  }
  ngOnInit(){
    const token = this.registerService.getToken()
    if(token){
      this.user = jwt_decode(token)
    }
    this.user_id = this.user.user_id
    this.getUser()
  }

    uploadFile(){
      const file = this.fileInput.nativeElement.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        this.userService.uploadAvatar(this.user_id, formData).subscribe(
          response => {
            
            this.toastr.success("Avatar uploaded")
            this.getUser()
        },
        error => {
          this.toastr.error('Try again')
        }
      )
  
    }
  }
  onSubmit(f: NgForm){
    this.userService.updateUser(this.user_id, this.user).subscribe(
      response => {
        this.toastr.success("Profile updated..Please login again")
        this.registerService.clearToken()
        this.router.navigate(['/login'])
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
