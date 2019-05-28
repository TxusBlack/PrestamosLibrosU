import { Devolucion } from './../../providers/db/db';
import { HelpersProvider } from './../../providers/helpers/helpers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-devoluciones',
  templateUrl: 'devoluciones.html',
})
export class DevolucionesPage {

  public ISBN: any;
  public usuario: string;
  public nuevaDevolucion: Devolucion;
  private libros: any;
  private usuarios: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DbProvider,
    private helpers: HelpersProvider,
    private alertCtrl: AlertController
  ) {
    this.db.obtenerTodosLosLibros().subscribe(libros => {
      this.libros = libros;
    });
    this.db.obtenerTodosLosUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }

  async realizarDevolucion() {
    const existeISBN = await this.checkExisteIsbn();
    const existeUser = await this.checkExisteEmail();
    if (existeISBN) {
      if (existeUser) {
        this.alertCtrl.create({
          message: '¿Está seguro que desea registrar la devolución del libro?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                this.complete();
              }
            }
          ]
        }).present();
        console.log('Si existe');
      } else {
        this.helpers.presentToast('El usuario no existe');
      }
    } else {
      this.helpers.presentToast('El libro no existe');
    }
  }

  complete() {
    /**
     * TODO:
     * Quitar el activo del préstamo y sumar la cantidad de disponibles en libros
     */
    this.helpers.presentLoading();
    this.nuevaDevolucion = {
      ISBN: this.ISBN,
      fecha: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      },
      usuario: this.usuario
    };
    this.db.registrarDevolucion(this.nuevaDevolucion).then(() => {
      this.helpers.closeLoading();
      this.helpers.presentToast('Devolución registrada exitosamente!');
      this.ISBN = null;
      this.usuario = null;
    }).catch(() => {
      this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
    });
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

  checkExisteEmail() {
    return new Promise(resolve => {
      this.usuarios.forEach(usuario => {
        if (usuario.email === this.usuario) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevolucionesPage');
  }

}
