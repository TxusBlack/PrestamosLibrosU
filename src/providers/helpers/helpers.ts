import { ToastController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class HelpersProvider {

  public loading: any;

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello HelpersProvider Provider');
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.loading.present();
  }

  closeLoading() {
    this.loading.dismiss();
  }

  presentToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
