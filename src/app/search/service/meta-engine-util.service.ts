import { Injectable } from '@angular/core';
import { Question } from '../entities/question.entity';

@Injectable({
  providedIn: 'root'
})
export class MetaEngineUtilService {

  constructor() { }

  public editQuestionHTML(question: Question){
    question.body = this.editHTML(question.body);
    question.answers.forEach(answer => {
      answer.body = this.editHTML(answer.body);
    });
    console.log(question);
  }

  private editHTML(str:string) : string{
    return str.split("<a href").join("<a target=\"_blank\" href");
  }

}
