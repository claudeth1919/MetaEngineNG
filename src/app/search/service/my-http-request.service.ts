import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyHttpRequestService {
  private api = environment.api.search;
  constructor(private httpClient: HttpClient) { }

  search(searchWords: string): any {
    return this.httpClient.get<any>(`${this.api}/${searchWords}`);
  }

  advanceSearch(data: any): any {
    return this.httpClient.get<any>(`${this.api}`, data);
  }

}
