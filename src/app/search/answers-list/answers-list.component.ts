import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Question } from '../entities/question.entity';
import { MyHttpRequestService } from '../service/my-http-request.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {
  private searchWords:string;
  public questions:Array<Question>;
  constructor(private route: ActivatedRoute, private myHttp: MyHttpRequestService) { }

  ngOnInit(): void {
    this.searchWords = this.route.snapshot.paramMap.get("searchWords");
    console.log(this.searchWords);
    this.myHttp.search(this.searchWords).subscribe((res: Array<Question>) => {
      console.log(res);
      this.questions = res;
    }, err => {
      console.log(err);
    });
    
  }



}
