import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchedItem } from '../entities/searchedItem.entity';
import { MyHttpRequestService } from '../service/my-http-request.service';
//import { NgxPaginationModule } from 'ngx-pagination';

enum OriginEnum {
  STACK_OVERFLOW = 0,
  NET = 1,
  GITHUB = 2
}

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
  public isLoading:boolean = true;

  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService) { }

  ngOnInit(): void {
    this.searchWords = this.route.snapshot.paramMap.get("searchWords");
    console.log(this.searchWords);
    this.myHttp.googleSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
    }, err => {
      console.log(err);
    });

    this.myHttp.bingSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
    
    this.myHttp.soSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
    }, err => {
      console.log(err);
    });

    /*
    this.myHttp.githubSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItem = this.searchedItem.concat(res);
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
    */

    this.myHttp.microsoftSearch(this.searchWords).subscribe((res: Array<SearchedItem>) => {
      console.log(res);
      this.searchedItems = this.searchedItems.concat(res);
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
    
  }


}
