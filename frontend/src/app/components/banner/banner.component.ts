import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{

  userLoggedIn! : boolean
  constructor(private registerService: RegisterService){}
  ngOnInit(){
    const token = this.registerService.getToken()
    if(token){
      this.userLoggedIn = true
    }
    else{
      this.userLoggedIn = false
    }
  }
}
