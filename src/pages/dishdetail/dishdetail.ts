import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                @Inject('BaseURL') public BaseURL,
                private favoriteservice: FavoriteProvider,
                private toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController
              ) {

    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Add to Favorites',
          role: 'addToFavorites',
          handler: () => {
            console.log('Adding to Favorites', this.dish.id);
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
            this.toastCtrl.create({
              message: 'Dish ' + this.dish.id + ' added as favorite successfully',
              position: 'middle',
              duration: 3000}).present();
          }
        },{
          text: 'Add a Comment',
          role: 'addAComment',
          handler: () => {

            console.log('Comment clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
