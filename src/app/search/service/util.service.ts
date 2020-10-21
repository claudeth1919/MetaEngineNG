import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http'
import { DOCUMENT } from '@angular/common';
import { OriginEnum, SearchInterfaceEnum } from './common';
import { SearchedItem } from '../entities/searchedItem.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answers.entity';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }
  public encodeURL(str: string): string{
    str = encodeURI(str);
    return str;
  }

  public testDate() : Array<SearchedItem> {
            let item : SearchedItem = new SearchedItem(); 
      item.questionId = Guid.create().toString();
      item.title = "Título";
      item.originId =  OriginEnum.STACK_OVERFLOW;
      item.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item.question = new Question();
      item.question.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item.question.title = "Título pregunta";
      item.searchInterfaceId = SearchInterfaceEnum.BING_API;
      item.question.answers = new Array<Answer>();
      let ans : Answer  = new Answer();
      ans.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      ans.isBest = false;
      item.question.answers.push(ans);

      let item2 : SearchedItem = new SearchedItem(); 
      item2.questionId = Guid.create().toString();
      item2.title = "Título";
      item2.originId =  OriginEnum.STACK_OVERFLOW;
      item2.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item2.question = new Question();
      item2.question.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item2.question.title = "Título pregunta";
      item2.searchInterfaceId = SearchInterfaceEnum.BING_API;
      item2.question.answers = new Array<Answer>();
      let ans2 : Answer  = new Answer();
      ans2.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      ans2.isBest = false;
      item2.question.answers.push(ans2);

      let item3 : SearchedItem = new SearchedItem(); 
      item3.questionId = Guid.create().toString();
      item3.title = "Título";
      item3.originId =  OriginEnum.STACK_OVERFLOW;
      item3.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item3.question = new Question();
      item3.question.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item3.question.title = "Título pregunta";
      item3.searchInterfaceId = SearchInterfaceEnum.GOOGLE_API;
      item3.question.answers = new Array<Answer>();
      let ans3 : Answer  = new Answer();
      ans3.body = "La 1 Lorem ipsum dolor sit amet, error c# consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      ans3.isBest = true;
      item3.question.answers.push(ans3);

      let item4 : SearchedItem = new SearchedItem(); 
      item4.questionId = Guid.create().toString();
      item4.title = "Título";
      item4.originId =  OriginEnum.STACK_OVERFLOW;
      item4.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item4.question = new Question();
      item4.question.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item4.question.title = "Título pregunta";
      item4.searchInterfaceId = SearchInterfaceEnum.BING_API;
      item4.question.answers = new Array<Answer>();
      let ans4 : Answer  = new Answer();
      ans4.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      ans4.isBest = false;
      item4.question.answers.push(ans4);


      let item5 : SearchedItem = new SearchedItem(); 
      item5.questionId = Guid.create().toString();
      item5.title = "Título";
      item5.originId =  OriginEnum.STACK_OVERFLOW;
      item5.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item5.question = new Question();
      item5.question.body = "Lorem ipsum dolor sit amet, error c# consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item5.question.title = "Título pregunta";
      item5.searchInterfaceId = SearchInterfaceEnum.GOOGLE_API;
      item5.question.answers = new Array<Answer>();
      let ans5 : Answer  = new Answer();
      ans5.body = "La 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      ans5.isBest = true;
      item5.question.answers.push(ans5);


      let item6 : SearchedItem = new SearchedItem(); 
      item6.questionId = Guid.create().toString();
      item6.title = "Título";
      item6.originId =  OriginEnum.STACK_OVERFLOW;
      item6.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item6.question = new Question();
      item6.question.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      item6.question.title = "Título pregunta";
      item6.searchInterfaceId = SearchInterfaceEnum.BING_API;
      item6.question.answers = new Array<Answer>();
      let ans6 : Answer  = new Answer();
      ans6.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis, arcu eu hendrerit lacinia, ligula ante ultrices neque, eget feugiat purus leo non ex. Proin sed elit ipsum. Ut tincidunt nulla a efficitur gravida. Phasellus ornare tristique quam nec laoreet. Nullam nunc ex, mollis sed enim vitae,";
      ans6.isBest = false;
      item6.question.answers.push(ans6);


      let array: Array<SearchedItem> = new Array<SearchedItem>();
      array.push(item);
      array.push(item2);
      array.push(item3);
      array.push(item4);
      array.push(item5);
      array.push(item6);
      return array;
  }
  

}
