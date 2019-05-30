import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Injectable } from '@angular/core';

@Injectable()
export class HelpersProvider {

  public loading: any;

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public barcode: BarcodeScanner
  ) {
    console.log('Hello HelpersProvider Provider');
  }

  leerBarcode() {
    return new Promise((resolve, reject) => {
      this.barcode.scan().then(barcodeData => {
        if (barcodeData.format === 'EAN_13') {
          resolve(barcodeData.text);
        } else {
          reject(true);
        }
        console.log('Barcode data', barcodeData);
      }).catch(err => {
        console.log('Error', err);
        reject(err);
      });
    });
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

  presentAlert(message) {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
