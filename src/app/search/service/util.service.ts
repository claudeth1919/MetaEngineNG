import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http'
import { DOCUMENT } from '@angular/common';
import { OriginEnum } from './common';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }
  public encodeURL(str: string): string{
    str = encodeURI(str);
    return str;
  }

}
