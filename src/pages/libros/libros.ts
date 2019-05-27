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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibrosPage');
    this.db.obtenerTodosLosLibros().subscribe(libros => {
      this.libros = libros;
      console.log(this.libros);
    });
  }

}
