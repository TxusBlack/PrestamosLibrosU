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
    /**
     * TODO:
     * Restar cantidad disponibles del libro
     */
    this.datosPrestamo.activo = true;
    this.datosPrestamo.fecha = {
      seconds: Math.floor(Date.now() / 1000),
      nanoseconds: 0
    };
    this.helpers.presentLoading();
    this.db.registrarPrestamo(this.datosPrestamo).then(() => {
      this.restarDisponibles().then(() => {
        this.helpers.closeLoading();
        this.helpers.presentToast('Préstamo registrado exitosamente!');
        this.navCtrl.pop();
      }).catch(() => {
        this.helpers.closeLoading();
        this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
      });
    }).catch(() => {
      this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
    });
  }

  restarDisponibles() {
    return new Promise((resolve,reject) => {
      this.db.obtenerTodosLosLibros().subscribe(libros => {
        let libro = libros.find(x => x.ISBN === this.datosPrestamo.ISBN);
        libro.disponibles -= 1;
        this.db.editarEnFirebase('libros', this.datosPrestamo.ISBN, libro).then(() => {
          console.log('Actualización exitosa');
          resolve()
        }).catch(() => {
          reject();
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerarPrestamoPage');
  }

}
