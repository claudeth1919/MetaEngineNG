import { Injectable } from '@angular/core';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answers.entity';

@Injectable({
  providedIn: 'root'
})
export class MetaEngineUtilService {
  public messageAfterVote: string = "Thank you for your participation";
  constructor() { }

  public editQuestionHTML(question: Question){
    question.body = this.editHTML(question.body);
    question.answers.forEach(answer => {
      answer.body = this.editHTML(answer.body);
    });
    console.log(question);
  }

  public editAnswerHTML(answer: Answer){
    answer.body = this.editHTML(answer.body);
    console.log(answer);
  }

  public remarkTextAnswer(answer: Answer, keywords: Array<string>){
      keywords.forEach(keyWord => {
           answer.body = answer.body.split(keyWord).join( "<b class=\"azul\" >" + keyWord + "</b>");
      });
      console.log(answer);
  }

  private editHTML(str:string) : string{
    return str.split("<a href").join("<a target=\"_blank\" href");
  }

}
