import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseURL';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient, @Inject('BaseURL') public BaseURL) {
    console.log('Hello LeaderProvider Provider');
  }

  /*getDishes() and getDish(id: number) weren't necessary for this exercise, so I'm not putting them here as they might need revision from my part to work.
    I'll just focus on getFeaturedDish()
  */

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders?featured=true')
      .map(data => data[0]);
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders')
      .map(data => data);
  }

  getLeader(id: number): Observable<Leader> {
    return  this.http.get<Leader>(baseURL + 'leaders/'+ id)
      .map(data => data);
  }

}
