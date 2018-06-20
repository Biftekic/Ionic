import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
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
export class DishProvider {

  constructor(public http: HttpClient, @Inject('BaseURL') public BaseURL) {
    console.log('Hello DishProvider Provider');
  }

  /*getDishes() and getDish(id: number) weren't necessary for this exercise, so I'm not putting them here as they might need revision from my part to work.
    I'll just focus on getFeaturedDish()
  */

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
      .map(data => data[0]);
  }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .map(data => data);
  }
}
