import { DbProvider, Usuario } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  public usuarios: any;
  public nuevoUsuario: Usuario = { };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DbProvider,
    private helpers: HelpersProvider
  ) {
  }

  registrar() {
    this.helpers.presentLoading();
    this.db.registrarUsuario(this.nuevoUsuario).then(() => {
      console.log('Ya se guardó');
      this.helpers.closeLoading();
      this.nuevoUsuario = {
        nombre: null,
        email: null,
        telefono: null
      };
      this.helpers.presentToast('Usuario registrado exitosamente!');
    }).catch(() => {
      this.helpers.presentToast('Ocurrió un problema, intentelo nuevamente o hable con el desarrollador');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
    this.db.obtenerTodosLosUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
