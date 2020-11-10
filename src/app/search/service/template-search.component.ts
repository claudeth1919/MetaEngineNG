import { TemplateComponent } from '../service/template.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyHttpRequestService } from '../service/my-http-request.service';
import { RedirectService } from '../service/redirect.service';
import { UtilService } from '../service/util.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class TemplatSearcheComponent extends TemplateComponent{
    public searchForm: FormGroup;
    private autocompleteOptions: Array<string> = new Array<string>();
    public filteredOptions: Observable<string[]>;
    private lastSearchInput: string;
    
    constructor(public fb: FormBuilder, public route: ActivatedRoute, public myHttp: MyHttpRequestService, public redirect: RedirectService, public utilService: UtilService) {
        super();
    }

    initialize() {
        this.searchForm = this.fb.group({
            searchWords: ['', Validators.required],
        });
        this.filteredOptions = this.searchWords.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.autocompleteOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    public getAutoComplete() {
        let words: string = this.searchWords.value;
        if (words == ' ' || words == '') {
            this.autocompleteOptions = new Array<string>();
            return;
        }
        if (words.length > 3) {
            let tempWord = words.replace(/\s\s+/g, ' ');
            if (tempWord == this.lastSearchInput) return;
            this.lastSearchInput = tempWord;
            console.log("getAutoComplete");
            this.myHttp.getAutocompleteWords(tempWord).subscribe((res: Array<string>) => {
                console.log(res);
                if (res != undefined && res != null) {
                    this.autocompleteOptions = res;
                }
            }, err => {
                console.log(err);
                this.autocompleteOptions = new Array<string>();
            });
        }
    }

    get controls() { return this.searchForm.controls; }
    get searchWords() { return this.searchForm.get('searchWords'); }

    public searchAnswers() {
        if (!this.isFormValid()) return;
        let searchString: string = this.utilService.encodeURL(this.searchWords.value);
        this.redirect.redirectToSearch(searchString);
        console.log(this.searchWords.value);
    }

    public optionSelectedOnAutoComplete(words) {
        this.searchForm.setValue({
            searchWords: words,
        });
        this.searchAnswers();
    }

    private isFormValid(): boolean {
        if (this.searchWords.invalid) return false;
        if (this.searchWords.value == undefined) return false;
        if (this.searchWords.value == null) return false;
        let tempWord: string = this.searchWords.value.replace(/\s\s+/g, ' ');
        if (tempWord == ' ') return false;
        if (tempWord.length < 5) return false;
        return true;
    }

    /*
    private getAutocomplete(){
        this.myHttp.getAutocompleteData(tempWord).subscribe((res: JSON) => {
                let results: Array<string> = new Array<string> ();
                if (res != undefined && res != null) {
                    let list = res["suggestionGroups"][0]["searchSuggestions"];
                    list.array.forEach(element => {
                        results.push(element["displayText"]);
                    });
                }
                this.autocompleteOptions = results;
            }, err => {
                console.log(err);
                this.autocompleteOptions = new Array<string>();
            });
    }
    */
}





/*
  public areAdvancedOptionsDisplayed: boolean = false;
  public categories: string[] = ["Error Text", "Tag"];
  public ERROR_TEXT_CATEGORY = this.categories[0];
  public TAG_CATEGORY = this.categories[1];
  public OPTIONS_LIMIT_NUMBER:number = 7;
  */

    //    advancedOptions: new FormArray([this.getNewAdvancedOption()])


/*
private getNewAdvancedOption() : FormGroup{
return this.fb.group({
  category: [this.categories[0], Validators.required],
  term: ['', [Validators.required]]
});
}

public addSearchInput(){
this.advancedOptions.push(this.getNewAdvancedOption());
}

public removeSearchInput(index:number){
this.advancedOptions.removeAt(index);
}

//get advancedOptions() { return this.controls.advancedOptions as FormArray; }

*/
  //if (!this.areAdvancedOptionsDisplayed){
    //}
/*
else{
  let tags = [];
  let textErrors = [];
  this.advancedOptions.controls.forEach(item => {
    if (item.get('category').value == this.TAG_CATEGORY) tags.push(item.get('term').value);
    if (item.get('category').value == this.ERROR_TEXT_CATEGORY) textErrors.push(item.get('term').value);
  });
  this.redirect.redirectToadvanceSearch(textErrors, tags);
  console.log(this.searchForm.get("advancedOptions").value);
}
*/

/*
if (!this.areAdvancedOptionsDisplayed && this.searchWords.invalid) return false;
else if (this.areAdvancedOptionsDisplayed){
  let tempItem = this.advancedOptions.controls.find(item => item.get('term').invalid);
  if (tempItem!=null) return false;
}
*/