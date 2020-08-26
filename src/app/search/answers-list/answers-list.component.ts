import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchedItem } from '../entities/searchedItem.entity';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { OriginEnum } from '../service/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {
  private searchWords:string;
  public searchedItems: Array<SearchedItem> = new Array<SearchedItem>();

  public STACK_OVERFLOW = OriginEnum.STACK_OVERFLOW;
  public NET = OriginEnum.NET;
  public GITHUB = OriginEnum.GITHUB;

  public page: number = 1;

  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService, public loading: LoadingService) { }

  ngOnInit(): void {
    this.loading.show();
    this.searchWords = this.route.snapshot.paramMap.get("searchWords");
    console.log(this.searchWords);
    this.myHttp.googleSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
/*
    this.myHttp.bingSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    
    this.myHttp.soSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });

    
    this.myHttp.githubSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItem = this.searchedItem.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    

    this.myHttp.microsoftSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
    */
    this.myHttp.microsoftSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.loading.hide();
    }, err => {
      this.loading.hide();
      console.log(err);
    });
  }

  public redirectToAnswer(originReference: number, questionId){
    this.redirect.redirectToAnswer(originReference, questionId);
  }


}
