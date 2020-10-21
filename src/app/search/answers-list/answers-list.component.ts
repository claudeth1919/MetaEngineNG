import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchedItem } from '../entities/searchedItem.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answers.entity';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { OriginEnum, SearchInterfaceEnum, InteractionTypeEnum } from '../service/common';
import { LoadingService } from '../../core/services/loading.service';
import { ModalService } from '../../search/service/modal.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnswerComponent } from './../answer/answer.component';
import { Guid } from "guid-typescript";
import { MetaEngineUtilService } from '../service/meta-engine-util.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {
  private searchWords:string;
  private arrayKeyWords: Array<string>;
  public searchedItems: Array<SearchedItem> = new Array<SearchedItem>();
  public possibleAnswers: Array<Answer> = new Array<Answer>();
  private completeSentence : string;
  private userSearchId: Guid =  Guid.create();
  private userSesionId: Guid;

  public STACK_OVERFLOW = OriginEnum.STACK_OVERFLOW;
  public NET = OriginEnum.NET;
  public GITHUB = OriginEnum.GITHUB;

  public page: number = 1;
  private modal: MatDialogRef<AnswerComponent>;

  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService, public modalService: ModalService, public matDialog: MatDialog, private snackBar: MatSnackBar, public util : UtilService, private metaUtilService: MetaEngineUtilService) { }

  public openModal(originId: OriginEnum, questionId: string, searchInterfaceId: SearchInterfaceEnum, question : Question) {
    let config: MatDialogConfig = this.modalService.getConfigModal();
    config.data ={
      originId: originId,
      questionId: questionId,
      searchInterfaceId: searchInterfaceId,
      arrayKeyWords: this.arrayKeyWords,
      question: question,
      completeSentence: this.completeSentence,
      userSearchId: this.userSearchId,
      userSesionId: this.userSesionId,
    };
    console.log(config.data);
    this.modal = this.matDialog.open(AnswerComponent, config);
    this.afterCloseModal();
  }

  private afterCloseModal(){
    this.modal.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.searchedItems.forEach(element => {
          if(element.questionId == response.question.id ){
            element.question.isSeen = response.question.isSeen;
            if (element.question.answers!=undefined){
              element.question.answers.forEach(ans => {
                ans.isVoted = (response.question.answers.filter(x => x.id == ans.id))[0].isVoted;
              });
            }
          }
        });
      });
  }

  ngOnInit(): void {
    this.loading.show();
    this.setSesionId();
    this.completeSentence = this.route.snapshot.paramMap.get("searchWords");
    this.searchWords = encodeURIComponent(this.completeSentence);
    console.log(this.searchWords);
    
    this.myHttp.getKeyWords(this.searchWords).subscribe((res: Array<string>) => {
      console.log(res);
      this.arrayKeyWords = res;
    }, err => {
      console.log(err);
    });
    //this.getSearchItems();
    this.searchedItems = this.util.testDate();
    this.setSearchedItemOrder();
    this.setRecomendedAnswers();
    this.loading.hide();
  }

  private getSearchItems(){
    this.myHttp.googleSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
      this.getQuestions();
    }, err => {
      this.loading.hide();
      console.log(err);
    }); 

    this.myHttp.bingSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
      this.getQuestions();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    
    this.myHttp.githubSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
      this.getQuestions();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    
    this.myHttp.microsoftSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
      this.getQuestions();
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

  }

  private setSearchedItemOrder(){
    let searchedItemsTemp : Array<SearchedItem> = new Array<SearchedItem>();
    let googledFirst : SearchedItem = this.searchedItems.find(x=> x.searchInterfaceId == SearchInterfaceEnum.GOOGLE_API);
    if(googledFirst!=undefined){
         searchedItemsTemp.push(googledFirst);
         this.searchedItems = this.searchedItems.filter(x=> x.questionId != googledFirst.questionId);
    }
    this.searchedItems.forEach(item=>{
        if(item!=undefined) searchedItemsTemp.push(item);
    });
    this.searchedItems = searchedItemsTemp;
  }

  private setRecomendedAnswers(){
    this.possibleAnswers= new Array<Answer>();
    let filterAnswers = this.searchedItems.filter(item=> item.question != undefined && item.question.answers != undefined);
    filterAnswers = this.searchedItems.filter(item=> item.question.answers != undefined);
    filterAnswers = this.searchedItems.filter(item=> item.question.answers.length > 0);
    if(filterAnswers.length > 0){
        let first:Answer = filterAnswers[0].question.answers[0];
        this.possibleAnswers.push(first);
        if(filterAnswers.length >= 1){
            let second:Answer = filterAnswers[1].question.answers[0];
            this.possibleAnswers.push(second);
        }
        console.log(this.possibleAnswers);
        this.possibleAnswers.forEach((element : Answer) => {
            this.metaUtilService.editAnswerHTML(element);
            this.metaUtilService.remarkTextAnswer(element, ["error c#"] /*this.arrayKeyWords*/);
        });
    }
  }

  private setSesionId(){
    let userSesionId: string = sessionStorage.getItem("userSesionId");
    if (userSesionId == "" || userSesionId == undefined){
      let guidId : Guid = Guid.create();
      sessionStorage.setItem("userSesionId", guidId.toString());
      this.userSesionId = guidId;
    }else{
      this.userSesionId = Guid.parse(userSesionId);
    }
  }

  private getQuestions(){
    let index = 1;
    this.searchedItems.forEach(item => {
      //if(index == 1){
        if (item.question == undefined) {
          this.myHttp.getQuestion(item.originId, item.questionId, item.searchInterfaceId, this.arrayKeyWords, false, this.completeSentence, this.userSearchId, this.userSesionId).subscribe((res: Question) => {
            console.log(res);
            item.question = res;
            if (res.answers == undefined) {
              if (res.answers.length == 0) this.searchedItems = this.searchedItems.filter(x => x.questionId != item.questionId);
            }
            console.log(this.searchedItems);
          }, err => {
            console.log(err);
            this.searchedItems = this.searchedItems.filter(x => x.questionId != item.questionId);
            console.log(this.searchedItems);
          });
       // }
      }
      index++
    });

  }

  public setAnswerVote(answerId: string, questionId:string, vote: number){
    console.log("setAnswerVote: " + vote);
    
    this.myHttp.updateAnswerInteractionWithValue(questionId, answerId , InteractionTypeEnum.PUBLICATION_IS_SEEN, vote, this.userSearchId, this.userSesionId).subscribe((res: boolean) => {
      console.log("RE: " + res);
      this.searchedItems.filter(x=> x.question!=undefined && x.question.id == questionId).forEach(item=>{
          (item.question.answers.filter(x=> x.id == answerId))[0].isVoted = res;
          if(res){
              this.snackBar.open(this.metaUtilService.messageAfterVote, undefined,{
                    duration: 2000
            });
          }
      });
      
    }, err => {
      console.log(err);
    });
  }

}
