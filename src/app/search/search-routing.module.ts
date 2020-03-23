import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnswersListComponent } from './answers-list/answers-list.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'answers', component: AnswersListComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
