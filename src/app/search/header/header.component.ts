import { RedirectService } from '../service/redirect.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { TemplatSearcheComponent } from '../../search/service/template-search.component';
import { UtilService } from '../../search/service/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TemplatSearcheComponent implements OnInit {

  constructor(public fb: FormBuilder, public route: ActivatedRoute, public myHttp: MyHttpRequestService, public redirect: RedirectService, public utilService: UtilService) {
    super(fb, route, myHttp, redirect, utilService);
  }

  ngOnInit(): void {
    this.initialize();
    let lastSearchWords = this.route.snapshot.paramMap.get("searchWords");
    this.searchForm.setValue({
      searchWords: lastSearchWords,
    });
  }

  public redirectToHome(){
    this.redirect.redirectToHome();
  }

}
