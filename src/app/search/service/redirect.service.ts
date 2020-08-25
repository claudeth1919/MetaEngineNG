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

  redirectToSearch(searchWords: string): any {
    this.document.location.href = `${this.URL_BASE}/answers/${searchWords}`;
  }

  redirectToAnswer(originReference: OriginEnum, questionId: string): any {
    this.document.location.href = `${this.URL_BASE}/answer/${originReference}/${questionId}`;
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
