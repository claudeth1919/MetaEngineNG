import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchForm: FormGroup;
  public areAdvancedOptionsDisplayed: boolean = false;
  public OPTIONS_LIMIT_NUMBER:number = 7;
  public categories: string[] = ["Error Text", "Tag"];
  public ERROR_TEXT_CATEGORY = this.categories[0];
  public TAG_CATEGORY = this.categories[1];

  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private myHttp: MyHttpRequestService, private redirect:RedirectService ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchWords: ['', Validators.required],
      advancedOptions: new FormArray([this.getNewAdvancedOption()])
    });
  }

  private getNewAdvancedOption() : FormGroup{
    return this.fb.group({
      category: [this.categories[0], Validators.required],
      term: ['', [Validators.required]]
    });
  }

  get controls() { return this.searchForm.controls; }
  get advancedOptions() { return this.controls.advancedOptions as FormArray; }
  get searchWords() { return this.searchForm.get('searchWords'); }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  public addSearchInput(){
    this.advancedOptions.push(this.getNewAdvancedOption());
  }

  public removeSearchInput(index:number){
    this.advancedOptions.removeAt(index);
  }

  public onResize(event:any) {
    console.log(event.target.innerWidth);
  }

  public searchAnswers(){
    if(!this.isFormValid()) return ;

    if (!this.areAdvancedOptionsDisplayed){
      this.redirect.redirectToSearch(this.searchWords.value);
    }
    else{
      let tags = [];
      let textErrors = [];
      this.advancedOptions.controls.forEach(item => {
        if (item.get('category').value == this.TAG_CATEGORY) tags.push(item.get('term').value);
        if (item.get('category').value == this.ERROR_TEXT_CATEGORY) textErrors.push(item.get('term').value);
      });
      this.redirect.redirectToadvanceSearch(textErrors, tags);
    }

    console.log(this.searchForm.get("searchWords").value);
    console.log(this.searchForm.get("advancedOptions").value);
  }

  private isFormValid(): boolean{
    if (!this.areAdvancedOptionsDisplayed && this.searchWords.invalid) return false;
    else if (this.areAdvancedOptionsDisplayed){
      let tempItem = this.advancedOptions.controls.find(item => item.get('term').invalid);
      if (tempItem!=null) return false;
    }
    return true;
  }

}
