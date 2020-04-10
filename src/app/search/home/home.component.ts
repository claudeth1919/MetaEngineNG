import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

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
    console.log(this.searchForm.get("searchWords").value);
    console.log(this.searchForm.get("advancedOptions").value);
  }

}
