import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Show} from '../data/show';

@Injectable()
export class TVAPI {

  static TVMAZE_API_URL: string = 'http://api.tvmaze.com/';

  constructor(private http: Http) {}

  search(query: string): Observable<any> {

    const search: URLSearchParams = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(`${TVAPI.TVMAZE_API_URL}search/shows`, new RequestOptions({search}))
      .map((res: any) => res.json())
      .map((shows: Array<{show: Show}>) => shows.map((show: {show: Show}) => show.show));
  }

  getEpisodes(id: number): Observable<any> {
    return this.http.get(`${TVAPI.TVMAZE_API_URL}shows/${id}/episodes`).map((res: any) => res.json());
  }

}