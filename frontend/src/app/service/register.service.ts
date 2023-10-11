import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import jwt_decode from 'jwt-decode';
import { NavigationExtras, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:5000/users'

  loggedIn!: boolean
  decodedToken! : any

  navigationExtras: NavigationExtras = {
    state: {
      data: ""
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  saveUser(user: any){
    return this.http.post(this.apiUrl, user)
  }

  loginUser(user: any){
    return this.http.post(`${this.apiUrl}/login`, user)
  }

  setToken(token: string){
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  clearToken(){
    localStorage.removeItem('authToken')
  }

  getUser() {
    try {
      const token = this.getToken();
      if (token) {
        const user = jwt_decode(token);
        return user;
      } else {
        if (this.navigationExtras && this.navigationExtras.state) {
          this.navigationExtras.state['data'] = "No token provided";
          this.router.navigate(['/alert'], this.navigationExtras);
          this.clearToken();
        }
        
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; 
    }
  }
  
  getRole(){
    try {
      const token = this.getToken()
      if(token){
        this.decodedToken = jwt_decode(token);
        const role = this.decodedToken.role;
        return role
      }
      else{
        if (this.navigationExtras && this.navigationExtras.state) {
          this.navigationExtras.state['data'] = "No token provided";
          this.router.navigate(['/alert'], this.navigationExtras)  
          this.clearToken()
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

}
