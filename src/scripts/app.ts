import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route} from 'angular2/router';
import {Search} from './ui/search';
import {EpisodeList} from './ui/episodelist';
import {SubscribedList} from './ui/subscribedlist';
import {Navbar} from './ui/navbar';

@Component({
  selector: 'app'  
})

@View ({
  templateUrl : 'app.html',
  directives: [ROUTER_DIRECTIVES, Navbar],  
  styles: [`
    .container {
      padding-top: 70px;
    }
  `]
})

@RouteConfig([
  new Route({path: '/search', component: Search, name: 'Search'}),
  new Route({path: '/episodes/:id', component: EpisodeList, name: 'Episodes'})
  //new Route({path: '/', component: SubscribedList, name: 'Subscribed'})
])
export class AppComponent {}