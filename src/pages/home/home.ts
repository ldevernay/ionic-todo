import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data/data';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, private localNotifications: LocalNotifications) {

    this.dataService.getData().then((todos) => {

      if(todos){
        this.items = JSON.parse(todos);
      }

    });

  }

  ionViewDidLoad(){

  }

  addItem(){

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if(item){
        this.saveItem(item);
      }

    });

    addModal.present();

  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
    });
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
