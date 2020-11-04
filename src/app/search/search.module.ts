import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SearchRoutingModule } from './search-routing.module';
import { HomeComponent } from './home/home.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { AnswerComponent } from './answer/answer.component';
import { HeaderComponent } from './header/header.component';
import { MyHttpRequestService } from '../search/service/my-http-request.service';
import { MetaEngineUtilService } from '../search/service/meta-engine-util.service';
import { ModalService } from '../search/service/modal.service';
import { RedirectService } from '../search/service/redirect.service';
import { UtilService } from '../search/service/util.service';

@NgModule({
  declarations: [
    HomeComponent, 
    AnswersListComponent, 
    AnswerComponent, 
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SearchRoutingModule,
  ],
  
  providers: [
    MyHttpRequestService,
    MetaEngineUtilService,
    ModalService,
    RedirectService,
    UtilService,
  ]
  
})
export class SearchModule { }
