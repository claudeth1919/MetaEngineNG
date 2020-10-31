import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { MetaEngineUtilService } from '../service/meta-engine-util.service';
import { OriginEnum, SearchInterfaceEnum, InteractionTypeEnum } from '../service/common';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answers.entity';
import { LoadingService } from '../../core/services/loading.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StarRatingComponent } from 'ng-starrating';
import { RatingModule } from 'ng-starrating';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public originId: OriginEnum;
  public searchInterfaceId: SearchInterfaceEnum;
  public questionId: string;
  public completeSentence: string;
  public arrayKeyWords: Array<string>;
  public question: Question = new Question();
  private userSearchId: Guid;
  private userSesionId: Guid;
  public isLoading:boolean = true;
  totalstar = 5;

  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService, public dialogRef: MatDialogRef<AnswerComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private metaUtilService: MetaEngineUtilService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.originId = this.data.originId;
    this.questionId = this.data.questionId;
    this.searchInterfaceId = this.data.searchInterfaceId;
    this.arrayKeyWords = this.data.arrayKeyWords;
    this.completeSentence = this.data.completeSentence;
    this.userSearchId = this.data.userSearchId;
    this.userSesionId = this.data.userSesionId;
    
    console.log(this.originId + " - " + this.questionId);
    if (this.data.question == undefined){
      console.log("Entrada 1 " + this.questionId);
      this.myHttp.getQuestion(this.originId, this.questionId, this.searchInterfaceId, this.arrayKeyWords, true, this.completeSentence, this.userSearchId, this.userSesionId).subscribe((res: Question) => {
        console.log(res);
        this.isLoading = false;
        this.question = res;
        this.question.isSeen = true;
        this.metaUtilService.editQuestionHTML(this.question);
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
    }else{
      this.question = this.data.question;
      this.metaUtilService.editQuestionHTML(this.question);
      console.log("Entrada 2 " + this.question.id);
      this.isLoading = false;
      if (!this.question.isSeen){
        this.myHttp.updateQuestionInteraction(this.question.id, InteractionTypeEnum.PUBLICATION_IS_SEEN, this.userSearchId, this.userSesionId).subscribe((res: boolean) => {
          console.log("RE: " + res);
          this.question.isSeen = res;
        }, err => {
          console.log(err);
        });
      }
    }
  }

  public closeModal(){
    console.log("Cerrar");
    this.dialogRef.close({ question: this.question });
  }

  setQuestionVote($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.myHttp.updateQuestionInteractionWithValue(this.question.id, InteractionTypeEnum.QUESTION_VOTED, $event.newValue, this.userSearchId, this.userSesionId).subscribe((res: boolean) => {
      console.log("RE: " + res);
      this.question.isVoted = res;
      if (res) {
        this.snackBar.open(this.metaUtilService.messageAfterVote, undefined, {
          duration: 2000
        });
      }
    }, err => {
      console.log(err);
    });
  }

  public getAnswersAmount() : number{
    if (this.question.answers == null) return 0;
    return this.question.answers.length;
  }

  public setAnswerVote(answerId: string, vote: number){
    console.log("setAnswerVote: " + vote);
    this.myHttp.updateAnswerInteractionWithValue(this.question.id, answerId , InteractionTypeEnum.ANSWER_VOTED, vote, this.userSearchId, this.userSesionId).subscribe((res: boolean) => {
      console.log("RE: " + res);
      (this.question.answers.filter(x => x.id == answerId))[0].isVoted = res;
      if(res){
            this.snackBar.open(this.metaUtilService.messageAfterVote, undefined,{
                duration: 2000
            });
       }
    }, err => {
      console.log(err);
    });
  }

  public getSourceTitle() : string{
    switch (this.originId){
      case OriginEnum.GITHUB:
        return "GitHub";
        break;
      case OriginEnum.NET:
        return "Microsoft";
        break;
      case OriginEnum.STACK_OVERFLOW:
        return "Stack Overflow";
        break;
        default:
          return "";
    }
  }

}
