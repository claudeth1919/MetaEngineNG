import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchedItem } from '../entities/searchedItem.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answers.entity';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { OriginEnum, SearchInterfaceEnum, InteractionTypeEnum, ScreenSizeEnum } from '../service/common';
import { LoadingService } from '../../core/services/loading.service';
import { ModalService } from '../../search/service/modal.service';
import { TemplateComponent } from '../../search/service/template.component';
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
export class AnswersListComponent extends TemplateComponent implements OnInit {
  private searchWords:string;
  private arrayKeyWords: Array<string>;
  public searchedItems: Array<SearchedItem> = new Array<SearchedItem>();
  public possibleAnswers: Array<Answer> = new Array<Answer>();
  private completeSentence : string;
  private userSearchId: Guid = Guid.create();
  private userSesionId: Guid;
  public isLoading:boolean = true;
  private timeInterval:number = 0;
  public itemsPerPage:number = 4;

  public page: number = 1;
  private modal: MatDialogRef<AnswerComponent>;

  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService, public modalService: ModalService, public matDialog: MatDialog, private snackBar: MatSnackBar, public util : UtilService, private metaUtilService: MetaEngineUtilService) {
    super();
    this.getScreenSize();
  }

  public openModal(originId: OriginEnum, questionId: string, searchInterfaceId: SearchInterfaceEnum, question : Question) {
    let config: MatDialogConfig = new MatDialogConfig();
    if (this.screenSize == ScreenSizeEnum.MIDDLE || this.screenSize == ScreenSizeEnum.SMALL){
      config = this.modalService.getConfigFullModal();
    }else{
      config = this.modalService.getConfigModal();
    }
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
          if (element.question!=undefined){
            if (element.question.id == response.question.id) {
              element.question.isSeen = response.question.isSeen;
              if (element.question.answers != undefined) {
                element.question.answers.forEach(ans => {
                  ans.isVoted = (response.question.answers.filter(x => x.id == ans.id))[0].isVoted;
                });
              }
            }
          }
        });
      });
  }

  ngOnInit(): void {
    this.setSesionId();
    let usedphrase = this.route.snapshot.paramMap.get("searchWords");
    this.completeSentence = usedphrase;
    this.searchWords = encodeURIComponent(usedphrase);
    console.log(this.searchWords);
    if(!this.isLoremIpsumData){
      this.myHttp.getKeyWords(this.searchWords).subscribe((res: Array<string>) => {
        console.log(res);
        this.arrayKeyWords = res;
      }, err => {
        console.log(err);
      });
      this.getSearchItems();
    }else{
      this.test();//Para probar
    }
  }

  private test(){
    this.searchedItems = this.util.testDate();
    this.setSearchedItemOrder(); 
    this.setRecomendedAnswers(); 
    this.isLoading = false;
    this.arrayKeyWords = ["error c#"];
  }

  private getSearchItems(){
    this.myHttp.googleSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      if(res!=undefined){
        if (res.length>0){
          this.searchedItems = this.searchedItems.concat(res);
          this.getQuestions();
          this.getMicrosoft();
          this.isLoading = false;
        }else{
          this.getBing();  
        }
      }else{
        this.getBing();
      }
    }, err => {
      this.isLoading = false;
      console.log(err);
      this.getBing();
    });
  }
 
  private setSearchedItemOrder(){
    console.log("setSearchedItemOrder");
    this.searchedItems.sort(function (a, b) {
      if (a.searchInterfaceId > b.searchInterfaceId) {
        return 1;
      }
      if (b.question.matchesAmount > a.question.matchesAmount){
        return 1;
      }
      if (a.searchInterfaceId < b.searchInterfaceId) {
        return -1;
      }
      return 0;
    });
  }

  private setRecomendedAnswers(){
    console.log("setRecomendedAnswers");
    this.possibleAnswers= new Array<Answer>();
    let filterAnswers = this.searchedItems.filter(item=> item.question != undefined && item.question != null);
    if (filterAnswers.length == 0) return;
    filterAnswers = filterAnswers.filter(item=> item.question.answers != null &&  item.question.answers != undefined);
    if (filterAnswers.length == 0) return;
    filterAnswers = filterAnswers.filter(item=> item.question.answers.length > 0);
    if (filterAnswers.length == 0) return;
    let first:Question = filterAnswers[0].question;
    first.answers[0].hasError = first.hasError;
    this.possibleAnswers.push(first.answers[0]);
    if (first.answers.length >= 2){ //Si la primera de google tiene más de una respuesta
      first.answers[1].hasError = first.hasError;
      this.possibleAnswers.push(first.answers[1]);
    }else{
      if (filterAnswers.length >= 1) {
        if (filterAnswers[1] != undefined) {
          if (filterAnswers[1].question != undefined) {
            let second: Question = filterAnswers[1].question;
            second.answers[0].hasError = second.hasError;
            this.possibleAnswers.push(second.answers[0]);
          }
        }
      }
    }
    
    console.log(this.possibleAnswers);
    this.possibleAnswers.forEach((element : Answer) => {
      this.metaUtilService.editAnswerHTML(element);
      if (this.arrayKeyWords !=undefined) this.metaUtilService.remarkTextAnswer(element, this.arrayKeyWords);
    });
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
    this.searchedItems.forEach(item => {
      if (item.question == undefined) {
        setTimeout(() => { this.getQuestionHTTP(item) }, this.timeInterval);
        this.timeInterval = this.timeInterval + 4300;
        console.log("Intervalo: " + this.timeInterval);
      }
    });
  }

  getQuestionHTTP(item: SearchedItem){
    console.log("getQuestionHTTP");
    if ((this.page * this.itemsPerPage) <= this.searchedItems.filter(x => x.originId == OriginEnum.STACK_OVERFLOW).length) return;
    console.log("getQuestionHTTP (enter)");
    this.myHttp.getQuestion(item.originId, item.questionElementId, item.searchInterfaceId, this.arrayKeyWords, false, this.completeSentence, this.userSearchId, this.userSesionId).subscribe((res: Question) => {
      if (res == null || res == undefined) {
        this.searchedItems = this.searchedItems.filter(x => x.questionElementId != item.questionElementId);
        console.log("1.- No :(");
      } else if (res.answers == undefined || res.answers == null) {
        this.searchedItems = this.searchedItems.filter(x => x.questionElementId != item.questionElementId);
        console.log("2.- No :(");
      } else if (res.answers.length == 0) {
        this.searchedItems = this.searchedItems.filter(x => x.questionElementId != item.questionElementId);
        console.log("3.- No :(");
      } else {
        item.question = res;
        console.log("Asignada");
        this.setSearchedItemOrder();
        this.setRecomendedAnswers();
      }
    }, err => {
      console.log(err);
      this.searchedItems = this.searchedItems.filter(x => x.questionElementId != item.questionElementId);
      console.log(this.searchedItems);
    });
  }

  public changePage(event){
    this.page = event;
    console.log("page: " + event);
    this.getQuestions();
  }

  public setAnswerVote(answerId: string, questionId:string, vote: number){
    console.log("setAnswerVote: " + vote);
    this.myHttp.updateAnswerInteractionWithValue(questionId, answerId , InteractionTypeEnum.ANSWER_VOTED, vote, this.userSearchId, this.userSesionId).subscribe((res: boolean) => {
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

  private getMicrosoft() {
    this.myHttp.microsoftSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      if(res!=undefined) {
        this.searchedItems = this.searchedItems.concat(res);
        this.getQuestions();
      }
      this.isLoading = false;
      //this.getBing();
    }, err => {
      this.isLoading = false;
      console.log(err);
      //this.getBing();
    });
  }

  private getBing() {
    this.myHttp.bingSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
      this.getQuestions();
      //this.getGithub();
      this.getMicrosoft();
    }, err => {
      this.isLoading = false;
      console.log(err);
      //this.getGithub();
      this.getMicrosoft();
    });
  }

  private getGithub() {
    this.myHttp.githubSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
      this.getQuestions();
      //this.getSO();
    }, err => {
      this.isLoading = false;
      console.log(err);
      //this.getSO();
    });
  }

  private getSO() {
    this.myHttp.soSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
      this.getQuestions();
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }

}
