import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public dataentry: string;

  // 0: anchor, 1: option_A, 2: option_B
  private images: any;
  public user_id = Math.floor(Math.random() * 1000000);
  public user_name: string;
  public counter = 0;

  constructor(
    public navCtrl: NavController,
    public dataProvider: DataProvider,
    public modalCtrl: ModalController,
    public storage: Storage) {

  }

  usernameForm() {
    console.log(this.dataentry);
    this.user_name = this.dataentry;
  }

  ionViewDidLoad() {

    this.generateNewSet('');

    this.storage.get('user_name').then((val) => {
      if (!val) {
        this.openModal();
      } else {
        this.user_name = val;
        console.log('user_name is:', val);
        this.storage.get(this.dataProvider.TABLE).then((count) => {
          this.counter = count;
        })
      }
    });

  }

  public openModal() {
    var modalPage = this.modalCtrl.create('UserInfoModalPage');

    modalPage.onDidDismiss(data => {
      this.user_name = data;
      console.log(this.user_name);
      this.storage.set('user_name', this.user_name);
    });
    modalPage.present();
  }

  public async select(choice) {

    let selected = '';

    if (choice == 'A') {
      selected = this.images[1];
    } else {
      selected = this.images[2];
    }

    let result = {
      Anchor: this.images[0],
      option_A: this.images[1],
      option_B: this.images[2],
      closest_to_anchor: selected,
      date: new Date(),
      user: this.user_id,
      user_name: this.user_name
    };

    try {
      this.dataProvider.addToGD(result);

      this.generateNewSet("");
      this.counter += 1;
      this.storage.set(this.dataProvider.TABLE, this.counter);

    } catch (err) {
      console.log('ERROR', err);
      alert('oops, something went wrong');
    }

  }

  generateNewSet(d) {

    this.dataProvider.getImageSets().then(images => {
      this.images = images;
      console.log(this.images)
    });

  }

}
