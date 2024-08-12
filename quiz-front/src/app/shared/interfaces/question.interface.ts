import { User } from './user.interface';

export interface IQuestion {
  text: string;
  image?: string;
  options: string[];
  correctAnswer: string;
}
