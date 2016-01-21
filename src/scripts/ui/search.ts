import {Component, View} from 'angular2/core';
import {TVAPI} from './../providers/providers';
import {SeriesList, SearchBox} from './uicomponents';
import {Show} from '../data/show';

@Component({
    selector: 'search-shows'
})

@View ( {
    directives: [SeriesList, SearchBox],
    templateUrl: 'search.html'
})

export class Search {

  public shows: Show[];
  public error: string;
  public searchRun : boolean = false;
  

  constructor(private tvAPI: TVAPI) {}

  resetSearch(): void {
    this.error = null;
    this.shows = null;
  }

  searchShows(text: string): void {
    this.searchRun = true;
    
    this.resetSearch();
    this
      .tvAPI
      .search(text)
      .subscribe(
        (data: Show[]) => this.shows = data,
        (err: string) => this.error = err
      );

  }

}