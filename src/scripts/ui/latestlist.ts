import {Component, View} from 'angular2/core';
import {RouteParams, OnActivate} from 'angular2/router';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {TVAPI} from './../providers/providers';
import {DateFormatPipe} from './../pipes/dateformat';
import {Show} from '../data/show';

@Component({
  selector: 'latestupdates' 
})

@View({
    pipes: [DateFormatPipe],
    directives: [COMMON_DIRECTIVES],
    templateUrl : 'latestlist.html'
})

export class LatestList {

  public latestShows: Observable <Show[]>;
  public sort: {field: string, desc: boolean} = {field: null, desc: false}; 
  
  constructor(routeParams: RouteParams, tvAPI: TVAPI) {
    this.latestShows = tvAPI.getLatestUpdates();
    console.log ('running latest updates');
    console.log ( this.latestShows );
    
  }
  

}