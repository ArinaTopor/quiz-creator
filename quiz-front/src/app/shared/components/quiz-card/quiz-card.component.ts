import { Component, Input } from '@angular/core';
import { IQuiz } from '../../interfaces/quiz.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class QuizCardComponent {
  @Input() quizz!: IQuiz;
}
