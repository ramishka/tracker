import {Component, View} from 'angular2/core';
import {RouteParams, OnActivate} from 'angular2/router';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {TVAPI} from './../providers/providers';
import {DateFormatPipe} from './../pipes/dateformat';
import {Episode} from '../data/episode';

@Component({
  selector: 'episodes' 
})

@View({
    pipes: [DateFormatPipe],
    directives: [COMMON_DIRECTIVES],
    templateUrl : 'episodelist.html'
})

export class EpisodeList {

  public episodes: Observable<Episode[]>;
  public sort: {field: string, desc: boolean} = {field: null, desc: false};

  constructor(routeParams: RouteParams, tvAPI: TVAPI) {
    this.episodes = tvAPI.getEpisodes(+routeParams.get('id'));
  }

}