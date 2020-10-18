import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { MetaEngineUtilService } from '../service/meta-engine-util.service';
import { OriginEnum, SearchInterfaceEnum } from '../service/common';
import { Question } from '../entities/question.entity';
import { LoadingService } from '../../core/services/loading.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public originId: OriginEnum;
  public searchInterfaceId: SearchInterfaceEnum;
  public questionId: string;
  public arrayKeyWords: Array<string>;
  public question: Question = new Question();
  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService, public dialogRef: MatDialogRef<AnswerComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private metaUtilService: MetaEngineUtilService) { }

  ngOnInit(): void {
    this.loading.show();
    this.originId = this.data.originId;
    this.questionId = this.data.questionId;
    this.searchInterfaceId = this.data.searchInterfaceId;
    this.arrayKeyWords = this.data.arrayKeyWords;

    console.log(this.originId + " - " + this.questionId);
    if (this.data.question == undefined){
      console.log("Entrada 1");
      this.myHttp.getQuestion(this.originId, this.questionId, this.searchInterfaceId, this.arrayKeyWords, true).subscribe((res: Question) => {
        console.log(res);
        this.loading.hide();
        this.question = res;
        this.metaUtilService.editQuestionHTML(this.question);
      }, err => {
        console.log(err);
        this.loading.hide();
      });
    }else{
      console.log("Entrada 2");
      this.question = this.data.question;
      this.loading.hide();
      this.myHttp.updateQuestionAsSeen(this.question.id).subscribe((res: boolean) => {
        console.log("RE: " + res);
      }, err => {
        console.log(err);
      });
    }
    
  }

  public getAnswersAmount() : number{
    if (this.question.answers == null) return 0;
    return this.question.answers.length;
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
