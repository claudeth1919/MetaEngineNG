import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { OriginEnum } from '../service/common';
import { Question } from '../entities/question.entity';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public originReference: OriginEnum;
  public questionId: string;
  public question: Question = new Question();
  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService) { }

  ngOnInit(): void {
    this.loading.show();
    let originStr: string = this.route.snapshot.paramMap.get("originReference");
    this.originReference = Number(originStr);
    this.questionId = this.route.snapshot.paramMap.get("questionId");

    this.myHttp.getQuestion(this.originReference, this.questionId).subscribe((res: Question) => {
      console.log(res);
      this.loading.hide();
      this.question = res;
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
    switch (this.originReference){
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
