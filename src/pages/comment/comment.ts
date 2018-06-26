import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { DishdetailPage } from '../../pages/dishdetail/dishdetail';


/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;
  stars: number = 5;
  myComment = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              private formBuilder: FormBuilder
              ) {

    this.comment = this.formBuilder.group({
      author: ['', Validators.required],
      rating: 5,
      comment: ['', Validators.required],
      date: new Date().toISOString()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  presentCommentModal() {
    let commentModal = this.modalCtrl.create(Comment);
    commentModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
    console.log('View Dismiss');
  }

  onSubmit() {
    let myComment = this.comment.value;
    this.viewCtrl.dismiss(myComment);
  }
}
