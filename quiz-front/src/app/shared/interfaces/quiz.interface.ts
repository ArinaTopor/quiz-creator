import { ICategory } from './category.interfase';
import { IQuestion } from './question.interface';
import { User } from './user.interface';

export interface IQuiz {
  _id: string;
  title: string;
  category: ICategory;
  tags: string[];
  description: string;
  question: IQuestion[];
  user: Pick<User, '_id' | 'first_name' | 'last_name'>;
  createdAt: Date;
  updatedAt: Date;
}
