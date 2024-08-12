import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './component/main.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizDataService } from '../../shared/services/quiz-data.service';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];
@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [MainComponent],
})
export class MainModule {}
