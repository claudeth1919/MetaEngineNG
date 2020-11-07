import { Component, OnInit } from '@angular/core';
import { TemplatSearcheComponent } from '../service/template-search.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends TemplatSearcheComponent implements OnInit {
  
  constructor(public fb: FormBuilder, public route: ActivatedRoute, public myHttp: MyHttpRequestService, public redirect: RedirectService, public utilService: UtilService) {
    super(fb, route, myHttp, redirect, utilService);
  }

  ngOnInit(): void {
    this.initialize();
  }

}
