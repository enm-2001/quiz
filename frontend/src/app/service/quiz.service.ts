import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:5000/quiz'

  constructor(private http: HttpClient) { }

  addQuiz(quiz: any){
    return this.http.post(this.apiUrl, quiz)
  }

  getQuiz(){
    return this.http.get(`${this.apiUrl}/categories`)
  }

  getMarksByCategory(){
    return this.http.get(`${this.apiUrl}/marks`)
  }

  getQuizByDate(){
    return this.http.get(`${this.apiUrl}/date`)
  }
}
