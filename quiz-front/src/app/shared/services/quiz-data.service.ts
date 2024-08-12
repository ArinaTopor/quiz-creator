import { HttpClient } from '@angular/common/http';
import { IQuiz } from '../interfaces/quiz.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  private _baseUrl: string = 'http://localhost:4444/';
  constructor(private _http: HttpClient) {}
  public getAllQuizzes(): Observable<IQuiz[]> {
    return this._http.get<IQuiz[]>(`${this._baseUrl}quizzes`);
  }

  public getQuiz(id: string) {
    return this._http.get<IQuiz>(`${this._baseUrl}quizzes/${id}`);
  }
}
