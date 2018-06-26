import { Component, Inject } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController, ActionSheetController, ViewController} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import {CommentPage} from "../comment/comment";
import { Comment } from '../../shared/comment';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  total: number;

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                @Inject('BaseURL') public BaseURL,
                private favoriteservice: FavoriteProvider,
                private toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public modalCtrl: ModalController
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


  presentCommentModal() {
       let commentModal = this.modalCtrl.create(CommentPage);
       commentModal.present();
       commentModal.onDidDismiss(comment => { if(comment) {
            this.dish.comments.push(comment);
           this.total = this.total + comment.rating
           }});
      }

  openComments() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss((myComment) => {
      if (myComment){
        this.dish.comments.push(myComment);
        this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating);
        this.avgstars = (total / this.numcomments).toFixed(2);
      }
    })
    modal.present();
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select actions',
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
            this.presentCommentModal()
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
