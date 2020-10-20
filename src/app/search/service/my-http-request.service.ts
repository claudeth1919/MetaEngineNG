import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { OriginEnum } from '../service/common';
import { SearchInterfaceEnum, InteractionTypeEnum } from '../service/common';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class MyHttpRequestService {
  private searchApi = environment.api.search;
  private userInteractionApi = environment.api.userInteraction;
  private answerApi = environment.api.answer;
  
  constructor(private httpClient: HttpClient) { }

  getQuestion(originId: OriginEnum, questionId: string, searchInterfaceId: SearchInterfaceEnum, arrayKeyWords: Array<string>, isSeenByUser: boolean, completeSentence: string, userSearchId: Guid, userSesionId: Guid): any {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    let formData: FormData = new FormData();
    if (arrayKeyWords != undefined){
      arrayKeyWords.forEach(item => {
        formData.append("arrayKeyWords", item);
      });
    }
    formData.append("isSeenByUser", (isSeenByUser ? "true" : "false"));
    formData.append("completeSentence", completeSentence);
    formData.append("userSearchId", userSearchId.toString());
    formData.append("userSesionId", userSesionId.toString());
    return this.httpClient.post<any>(`${this.answerApi}/${originId}/${questionId}/${searchInterfaceId}`, formData, { headers: headers});
  }

  getKeyWords(searchWords: string): any{
    return this.httpClient.get<any>(`${this.userInteractionApi}/keyWords/${searchWords}`);
  }

  updateQuestionInteraction(questionId: string, interactionType: InteractionTypeEnum, userSearchId: Guid, userSesionId: Guid): any {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    let formData: FormData = new FormData();
    formData.append("interactionType", interactionType.toString());
    formData.append("userSearchId", userSearchId.toString());
    formData.append("userSesionId", userSesionId.toString());
    formData.append("questionId", questionId);
    return this.httpClient.put<any>(`${this.userInteractionApi}/interaction/question/${questionId}`, formData);
  }

  updateQuestionInteractionWithValue(questionId: string, interactionType: InteractionTypeEnum, value: number, userSearchId: Guid, userSesionId: Guid): any {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    let formData: FormData = new FormData();
    formData.append("interactionType", interactionType.toString());
    formData.append("userSearchId", userSearchId.toString());
    formData.append("userSesionId", userSesionId.toString());
    formData.append("questionId", questionId);
    formData.append("value", value.toString());
    return this.httpClient.post<any>(`${this.userInteractionApi}/interaction/question/${questionId}`, formData);
  }

  updateAnswerInteractionWithValue(questionId: string, answerId: string, interactionType: InteractionTypeEnum, value: number, userSearchId: Guid, userSesionId: Guid): any {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    let formData: FormData = new FormData();
    formData.append("interactionType", interactionType.toString());
    formData.append("userSearchId", userSearchId.toString());
    formData.append("userSesionId", userSesionId.toString());
    formData.append("questionId", questionId);
    formData.append("value", value.toString());
    return this.httpClient.post<any>(`${this.userInteractionApi}/interaction/question/${answerId}/${questionId}`, formData);
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
