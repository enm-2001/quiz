import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import jwt_decode from 'jwt-decode'
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user! : any
  profile: any = {name: '', email: '', username: '', role: '', avatar: ''}
  user_id! : string
  imageSrc! : any
  constructor(private registerService: RegisterService, private userService: UserService){ }
  ngOnInit(){
    const token = this.registerService.getToken()
    if(token){
      this.user = jwt_decode(token)
    }
    this.user_id = this.user.user_id
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
  
}
