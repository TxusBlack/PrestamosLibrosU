import { HelpersProvider } from './../../providers/helpers/helpers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-libros',
  templateUrl: 'libros.html',
})
export class LibrosPage {

  public libros: any;
  public ISBN: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DbProvider,
    private helpers: HelpersProvider
  ) {
  }

  async readCode() {
    this.helpers.leerBarcode().then(code => {
      this.ISBN = code;
      this.registrarLibro();
    }).catch(e => {
      if (e === true) {
        this.helpers.presentToast('El código escaneado no pertenece a un código de barras');
      } else {
        this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
      }
    });
  }

  registrarLibro() {
    console.log('-', this.ISBN);
    this.navCtrl.push('RegistrarLibroPage', { isbn: this.ISBN });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibrosPage');
    this.db.obtenerTodosLosLibros().subscribe(libros => {
      this.libros = libros;
      console.log(this.libros);
    });
  }

  ionViewWillEnter() {
   this.ISBN = null;
  }

}
