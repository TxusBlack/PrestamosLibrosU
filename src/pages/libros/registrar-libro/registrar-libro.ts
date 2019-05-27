import { DbProvider } from './../../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Libro } from '../../../providers/db/db';
import { HelpersProvider } from '../../../providers/helpers/helpers';

@IonicPage()
@Component({
  selector: 'page-registrar-libro',
  templateUrl: 'registrar-libro.html',
})
export class RegistrarLibroPage {

  public datosLibro: Libro = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DbProvider,
    private helpers: HelpersProvider
  ) {
    this.datosLibro.ISBN = this.navParams.get('isbn');
    console.log(this.datosLibro);
  }

  guardarLibro() {
    this.datosLibro.disponibles = this.datosLibro.cantidad;
    this.helpers.presentLoading();
    this.db.registrarLibro(this.datosLibro.ISBN, this.datosLibro).then(() => {
      console.log('Ya se guardó');
      this.helpers.closeLoading();
      this.helpers.presentToast('Libro registrado exitosamente!');
      this.navCtrl.pop();
    }).catch(() => {
      this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente');
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarLibroPage');
  }

}
