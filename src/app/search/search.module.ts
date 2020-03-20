import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SearchRoutingModule } from './search-routing.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule
  ]
})
export class SearchModule { }
