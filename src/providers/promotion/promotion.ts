import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Promotion} from "../../shared/promotion";
//import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient, @Inject('BaseURL') private BaseURL) {
    console.log('Hello PromotionProvider Provider');
  }

  /*getDishes() and getDish(id: number) weren't necessary for this exercise, so I'm not putting them here as they might need revision from my part to work.
    I'll just focus on getFeaturedDish()
  */

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
      .map(data => data[0]);
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .map(data => data);
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.http.get<Promotion>(baseURL + 'promotions/'+ id)
      .map(data => data);
  }

}
