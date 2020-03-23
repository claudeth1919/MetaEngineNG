import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchWords: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  public onResize(event:any) {
    console.log(event.target.innerWidth);
  }

  public searchAnswers(){
    console.log(this.searchForm.get("searchWords").value);
  }

}
