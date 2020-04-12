import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyHttpRequestService {
  private api = environment.api.search;
  constructor(private httpClient: HttpClient) { }

  search(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/answers/${searchWords}`);
  }

  advanceSearch(textErrors: any, tags: any): any {
    let params = new HttpParams();
    textErrors.forEach(element => {
      params = params.append('errorText', element);
    });
    tags.forEach(element => {
      params = params.append('tag', element);
    });
    //params = params.append('tag', tags.join('|'));
    return this.httpClient.get<any>(`${this.api}/advance/answers`, {params : params});
  }

}
