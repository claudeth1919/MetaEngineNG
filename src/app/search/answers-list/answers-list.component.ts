import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchedItem } from '../entities/searchedItem.entity';
import { Question } from '../entities/question.entity';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { OriginEnum, SearchInterfaceEnum } from '../service/common';
import { LoadingService } from '../../core/services/loading.service';
import { ModalService } from '../../search/service/modal.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AnswerComponent } from './../answer/answer.component';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {
  private searchWords:string;
  private arrayKeyWords: Array<string>;
  public searchedItems: Array<SearchedItem> = new Array<SearchedItem>();

  public STACK_OVERFLOW = OriginEnum.STACK_OVERFLOW;
  public NET = OriginEnum.NET;
  public GITHUB = OriginEnum.GITHUB;

  public page: number = 1;
  private modal: MatDialogRef<AnswerComponent>;

  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService, public modalService: ModalService, public matDialog: MatDialog) { }

  public openModal(originId: OriginEnum, questionId: string, searchInterfaceId: SearchInterfaceEnum, question : Question) {
    let config: MatDialogConfig = this.modalService.getConfigModal();
    config.data ={
      originId: originId,
      questionId: questionId,
      searchInterfaceId: searchInterfaceId,
      arrayKeyWords: this.arrayKeyWords,
      question: question,
    };
    console.log(config.data);
    this.modal = this.matDialog.open(AnswerComponent, config);
  }

  ngOnInit(): void {
    this.loading.show();
    this.searchWords = encodeURIComponent(this.route.snapshot.paramMap.get("searchWords"));
    console.log(this.searchWords);
    
    this.myHttp.getKeyWords(this.searchWords).subscribe((res: Array<string>) => {
      console.log(res);
      this.arrayKeyWords = res;
    }, err => {
      console.log(err);
    });

    
    
    this.myHttp.googleSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
      this.getQuestions();
    }, err => {
      this.loading.hide();
      console.log(err);
    }); 
    
/*
    this.myHttp.bingSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    
    this.myHttp.soSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });

    
    this.myHttp.githubSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    

    this.myHttp.microsoftSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    
    */
  }

  private setSearchedItemOrder(){
    let searchedItemsTemp : Array<SearchedItem>;
    //searchedItemsTemp.push();
    //searchedItemsTemp.
    //this.searchedItems[0];
    this.searchedItems.find(item=> item.searchInterfaceId == SearchInterfaceEnum.GOOGLE_API);
    this.searchedItems.forEach(item=>{

    });
  }

  private getQuestions(){
    this.searchedItems.forEach(item => {
      if (item.question == undefined){
        this.myHttp.getQuestion(item.originId, item.questionId, item.searchInterfaceId, this.arrayKeyWords, false).subscribe((res: Question) => {
          console.log(res);
          item.question = res;
          if(res.answers == undefined){
            if (res.answers.length == 0) this.searchedItems = this.searchedItems.filter(x => x.questionId != item.questionId);
          }
          console.log(this.searchedItems);
        }, err => {
          console.log(err);
          this.searchedItems = this.searchedItems.filter(x => x.questionId != item.questionId);
          console.log(this.searchedItems);
        });
      }
    });

  }

}
