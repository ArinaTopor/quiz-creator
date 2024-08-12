import { Component, Signal } from '@angular/core';
import { QuizDataService } from '../../../shared/services/quiz-data.service';
import { IQuiz } from '../../../shared/interfaces/quiz.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  protected data$: BehaviorSubject<IQuiz[]> = new BehaviorSubject<IQuiz[]>([]);
  constructor(private _quizDataService: QuizDataService) {
    this._quizDataService
      .getAllQuizzes()
      .subscribe((quizzes) => this.data$.next(quizzes));
  }
}
