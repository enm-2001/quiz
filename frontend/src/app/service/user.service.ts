import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/users'
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.apiUrl)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateUser(id: string, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }

  getUserById(id: string){
    return this.http.get(`${this.apiUrl}/${id}`)
  }
  uploadAvatar(id: string, file:any){
    // console.log("avatar:::",avatar.name);
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/${id}/avatar`,file)
  }

  getImageUrl(image: any) {
    // console.log(image);
    
    const base64 = window.btoa(
      new Uint8Array(image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:${image.type};base64,${base64}`;
  }
}
