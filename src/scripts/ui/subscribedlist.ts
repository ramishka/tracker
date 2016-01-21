import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Storage} from '../providers/providers';
import {SeriesList} from './uicomponents';
import {Show} from '../data/show';

@Component({
  selector: 'subscribed-shows' 
})

@View ({
    templateUrl : 'subscribedlist.html',   
    directives: [SeriesList, ROUTER_DIRECTIVES]
})

export class SubscribedList {

  public subscribedShows: Show[];

  constructor(private localStorage: Storage) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  unsubscribe(show: Show): void {
    this.subscribedShows = this.subscribedShows.filter((subscribedShow: Show) => subscribedShow.id !== show.id);
  }

}