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

  async readCode() {
    this.helpers.leerBarcode().then(code => {
      this.ISBN = code;
    }).catch(e => {
      if (e === true) {
        this.helpers.presentToast('El código escaneado no pertenece a un código de barras');
      } else {
        this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
      }
    });
  }

  async realizarDevolucion() {
    let existeISBN = this.checkExisteIsbn.bind(this);
    let existeUser = await this.checkExisteEmail();
    console.log('existeISBN', existeISBN);
    console.log('existeUser', existeUser);
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

      this.sumarDisponibles().then(() => {
        this.helpers.closeLoading();
        this.helpers.presentToast('Devolución registrada exitosamente!');
        this.ISBN = null;
        this.usuario = null;
        this.navCtrl.pop();
      }).catch(() => {
        this.helpers.closeLoading();
        this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
      });
    }).catch(() => {
      this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
    });
  }

  sumarDisponibles() {
    return new Promise((resolve,reject) => {
      this.db.obtenerTodosLosLibros().subscribe(libros => {
        let libro = libros.find(x => x.ISBN === this.ISBN);
        libro.disponibles += 1;
        this.db.editarEnFirebase('libros', this.ISBN, libro).then(() => {
          console.log('Actualización exitosa');
          resolve()
        }).catch(() => {
          reject();
        });
      });
    });
  }

  checkExisteIsbn() {
    this.libros.forEach(libro => {
      if (parseInt(libro.ISBN) == parseInt(this.ISBN)) {
        console.log(true);
        return true;
      } else {
        return false;
      }
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
