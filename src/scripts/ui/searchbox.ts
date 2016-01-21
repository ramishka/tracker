import {Component, View, Output, EventEmitter} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'search-box'
})

@View ( {
  directives: [FORM_DIRECTIVES],
  templateUrl: 'searchbox.html'
})

export class SearchBox {

  @Output() runSearch: EventEmitter<any> = new EventEmitter();

  private searchForm: ControlGroup;

  constructor(fb: FormBuilder) {
    this.searchForm = fb.group({
      query: ['', Validators.required]
    });
  }

}