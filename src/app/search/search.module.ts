import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SearchRoutingModule } from './search-routing.module';
import { HomeComponent } from './home/home.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { AnswerComponent } from './answer/answer.component';



@NgModule({
  declarations: [HomeComponent, AnswersListComponent, AnswerComponent],
  imports: [
    CommonModule,
    CoreModule,
    SearchRoutingModule,
  ],
})
export class SearchModule { }
