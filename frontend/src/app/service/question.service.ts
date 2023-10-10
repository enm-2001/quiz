import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:5000/questions'

  constructor(private http: HttpClient) { }

  getQuestions(category_id: string){
    // console.log("caturu",category_id);
 
    return this.http.get(`${this.apiUrl}/${category_id}`)
  }

  createQuestion(question: any) {
    return this.http.post(this.apiUrl, {question})
  }

  deleteQuestion(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getQuestionById(id: string){
    return this.http.get(`${this.apiUrl}/ques/${id}`)
  }

  updateQuestion(id: string, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }
}
