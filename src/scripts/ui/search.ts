import {Component, View} from 'angular2/core';
import {TVAPI} from './../providers/providers';
import {SearchResultsList, SearchBox} from './uicomponents';
import {Show} from '../data/show';

@Component({
    selector: 'search-shows'
})

@View ( {
    directives: [SearchResultsList, SearchBox],
    templateUrl: 'search.html'
})

export class Search {

  public shows: Show[];
  public error: string;

  constructor(private tvAPI: TVAPI) {}

  resetSearch(): void {
    this.error = null;
    this.shows = null;
  }

  searchShows(text: string): void {

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