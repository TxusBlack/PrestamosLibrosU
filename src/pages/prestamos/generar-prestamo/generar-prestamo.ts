import { HelpersProvider } from './../../../providers/helpers/helpers';
import { Prestamo, DbProvider } from './../../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-generar-prestamo',
  templateUrl: 'generar-prestamo.html',
})
export class GenerarPrestamoPage {

  public datosPrestamo: Prestamo = { };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private helpers: HelpersProvider,
    private db: DbProvider
  ) {
    this.datosPrestamo.ISBN = this.navParams.get('isbn');
  }

  generarPrestamo() {
    this.datosPrestamo.activo = true;
    this.datosPrestamo.fecha = {
      seconds: Math.floor(Date.now() / 1000),
      nanoseconds: 0
    };
    this.helpers.presentLoading();
    this.db.registrarPrestamo(this.datosPrestamo).then(() => {
      this.helpers.closeLoading();
      this.helpers.presentToast('Préstamo registrado exitosamente!');
      this.navCtrl.pop();
    }).catch(() => {
      this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerarPrestamoPage');
  }

}
