import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:5000/categories'

  constructor(private http: HttpClient) { }

  getCategories(){
    
    return this.http.get(this.apiUrl)
  }

  createCategory(category: any){
    return this.http.post(this.apiUrl, category)
  }

  deleteCategory(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getCategoryById(id: string){
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  updateCategory(id:string, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }

  updateQuiz(id: string, data: any){
    return this.http.put(`${this.apiUrl}/quiz/${id}`,data)
  }
}
