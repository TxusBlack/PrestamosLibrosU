import { HelpersProvider } from './../../providers/helpers/helpers';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-prestamos',
  templateUrl: 'prestamos.html',
})
export class PrestamosPage {

  public prestamos: any = { };
  public hayPrestamosActivos: boolean = false;
  public ISBN: any;
  private libros: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private helpers: HelpersProvider,
    private db: DbProvider
  ) {
    this.db.obtenerTodosLosPrestamos().subscribe((prestamos: any) => {
      this.prestamos = prestamos;
      this.checkPrestamosActivos();
      console.log(this.prestamos);
    })
    this.db.obtenerTodosLosLibros().subscribe(libros => {
      this.libros = libros;
    });
  }

  async registrarPrestamo() {
    const existe = await this.checkExisteIsbn();
    if (existe) {
      this.navCtrl.push('GenerarPrestamoPage', { isbn: this.ISBN });
      console.log('Si existe el libro');
    } else {
      this.helpers.presentToast('El libro no existe');
    }
  }

  checkExisteIsbn() {
    return new Promise(resolve => {
      this.libros.forEach(libro => {
        if (libro.ISBN === this.ISBN) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  obtenerDatos(email) {
    this.db.obtenerInfoUsuario(email).subscribe(res => {
      console.log('data user', res);
      this.helpers.presentAlert(
        `
          Nombre: ${res.nombre}
          \nEmail: ${res.email}
          \nTeléfono: ${res.telefono}
        `
      );
    });
  }
  
  checkPrestamosActivos() {
    this.prestamos.forEach(prestamo => {
      if (prestamo.activo) {
        this.hayPrestamosActivos = true;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestamosPage');
  }

  ionViewWillLeave() {
   this.ISBN = null;
  }

}
