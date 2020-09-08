import { RedirectService } from '../service/redirect.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyHttpRequestService } from '../service/my-http-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect: RedirectService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchWords: ['', null],
    });
  }

  get controls() { return this.searchForm.controls; }
  get searchWords() { return this.searchForm.get('searchWords'); }

  public onResize(event: any) {
    console.log(event.target.innerWidth);
  }

  public searchAnswers() {
    if (this.searchForm.get("searchWords").value!=''){
      this.redirect.redirectToSearch(this.searchWords.value);
    }
    console.log(this.searchForm.get("searchWords").value);
  }

  public redirectToHome(){
    this.redirect.redirectToHome();
  }

}
