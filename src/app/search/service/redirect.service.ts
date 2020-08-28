import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http'
import { DOCUMENT } from '@angular/common';
import { OriginEnum } from '../service/common';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private URL_BASE: string = "search";
  constructor(@Inject(DOCUMENT) private document: Document) { }
  redirectToHome(){
    this.document.location.href = "/";
  }
  redirectToSearch(searchWords: string): any {
    this.document.location.href = `${this.URL_BASE}/answers/${searchWords}`;
  }

  redirectToAnswer(originReference: OriginEnum, questionId: string): any {
    let url = `${this.URL_BASE}/answer/${originReference}/${questionId}`;
    var win = window.open(url, '_blank');
    win.focus();
    //this.document.location.href = ;
  }

  redirectToadvanceSearch(textErrors: any, tags: any): any {
    let params = new HttpParams();
    textErrors.forEach(element => {
      params = params.append('errorText', element);
    });
    tags.forEach(element => {
      params = params.append('tag', element);
    });
    this.document.location.href = `${this.URL_BASE}/advance/answers${params.getAll}`;
    console.log(params);
  }
}
