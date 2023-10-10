import { Component, OnInit } from '@angular/core';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  token! : any
  constructor(private registerService: RegisterService) { }
  
  ngOnInit(){
    this.token = this.registerService.getToken()
    if(this.token){
      this.registerService.loggedIn = true
    }
    else{
      this.registerService.loggedIn = false
    }
  }
}
