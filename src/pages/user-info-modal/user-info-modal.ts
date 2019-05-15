import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserInfoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info-modal',
  templateUrl: 'user-info-modal.html',
})
export class UserInfoModalPage {

  public name: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss(this.name);
  }

}
