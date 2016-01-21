import {Component, View, Input, Output, EventEmitter} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {Storage, TVAPI} from './../providers/providers';
import {Show} from '../data/show';
import {Episode} from '../data/episode';
import {TruncatePipe} from '../pipes/truncate';
import {DateFormatPipe} from '../pipes/dateformat';

@Component({
    selector: 'show-list',    
})

@View ( {
    directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'serieslist.html',
    pipes : [TruncatePipe, DateFormatPipe]
})

export class SeriesList {

  @Input() public shows: Array<Show>;
  @Output('unsubscribe') public unsubscribeCallback: EventEmitter<any> = new EventEmitter();
  public subscribedShows: Array<Show>;
  public sort: {field: string, desc: boolean} = {field: null, desc: false};

  constructor(private localStorage: Storage, private tvMaze: TVAPI) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  subscribe(show: Show): void {
    this.subscribedShows.push(show);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
  }

  isSubscribed(show: Show): Object {
    return this.subscribedShows.find((subscribedShow: Show) => subscribedShow.id === show.id);
  }

  unsubscribe(show: Show): void {
    this.subscribedShows = this.subscribedShows.filter((subscribedShow: Show) => subscribedShow.id !== show.id);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
    this.unsubscribeCallback.next(show);
  }

  ngOnChanges(changeRecord: any): void {

    if (changeRecord.shows && this.shows) {

      const episodeRequests: Observable<any>[] = this.shows.map((show: Show) => this.tvMaze.getEpisodes(show.id));

      Observable.forkJoin(episodeRequests).subscribe((showEpisodes: Episode[][]) => {

        showEpisodes.forEach((episodes: Episode[], showIndex: number) => {

          this.shows[showIndex].nextEpisode = episodes.find((episode: Episode) => {
            return new Date(episode.airdate).getTime() > Date.now();
          });
        });
      });
    }
  }
}