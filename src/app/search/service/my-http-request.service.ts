import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { OriginEnum } from '../service/common';

@Injectable({
  providedIn: 'root'
})
export class MyHttpRequestService {
  private searchApi = environment.api.search;
  private answerApi = environment.api.answer;
  
  constructor(private httpClient: HttpClient) { }
  getQuestion(originReference: OriginEnum, questionId: string): any {
    return this.httpClient.get<any>(`${this.answerApi}/${originReference}/${questionId}`);
  }

  googleSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.searchApi}/answers/google/${searchWords}`);
  }

  bingSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.searchApi}/answers/bing/${searchWords}`);
  }

  soSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.searchApi}/answers/so/${searchWords}`);
  }

  githubSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.searchApi}/answers/github/${searchWords}`);
  }

  microsoftSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.searchApi}/answers/microsoft/${searchWords}`);
  }

  completeSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.searchApi}/answers/${searchWords}`);
  }

  advanceSearch(textErrors: any, tags: any): any {
    let params = this.getParamSearchFormat(textErrors, tags);
    return this.httpClient.get<any>(`${this.searchApi}/advance/answers`, { params: params });
  }

  private getParamSearchFormat(textErrors: any, tags: any){
    let params = new HttpParams();
    textErrors.forEach(element => {
      params = params.append('errorText', element);
    });
    tags.forEach(element => {
      params = params.append('tag', element);
    });
    //params = params.append('tag', tags.join('|'));
    return params;
  }

}
