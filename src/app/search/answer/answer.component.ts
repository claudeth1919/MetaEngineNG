import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { MetaEngineUtilService } from '../service/meta-engine-util.service';
import { OriginEnum } from '../service/common';
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
  public questionId: string;
  public question: Question = new Question();
  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService, public dialogRef: MatDialogRef<AnswerComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private metaUtilService: MetaEngineUtilService) { }

  ngOnInit(): void {
    this.loading.show();
    this.originId = this.data.originId;
    this.questionId = this.data.questionId;
    console.log(this.originId + " - " + this.questionId);
    this.myHttp.getQuestion(this.originId, this.questionId).subscribe((res: Question) => {
      console.log(res);
      this.loading.hide();
      this.question = res;
      this.metaUtilService.editQuestionHTML(this.question);
    }, err => {
      console.log(err);
        this.loading.hide();
    });
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
