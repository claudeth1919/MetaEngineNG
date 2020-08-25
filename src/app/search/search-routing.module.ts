import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'answers/:searchWords', component: AnswersListComponent },
    { path: 'answer/:originReference/:questionId', component: AnswerComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
