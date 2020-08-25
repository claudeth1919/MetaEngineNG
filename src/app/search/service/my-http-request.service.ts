import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MyHttpRequestService {
  private api = environment.api.search;
  
  constructor(private httpClient: HttpClient) { }

  googleSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/google/${searchWords}`);
  }

  bingSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/bing/${searchWords}`);
  }

  soSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/so/${searchWords}`);
  }

  githubSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/github/${searchWords}`);
  }

  microsoftSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/microsoft/${searchWords}`);
  }

  completeSearch(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/${searchWords}`);
  }

  advanceSearch(textErrors: any, tags: any): any {
    let params = this.getParamSearchFormat(textErrors, tags);
    return this.httpClient.get<any>(`${this.api}/advance/answers`, { params: params });
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
