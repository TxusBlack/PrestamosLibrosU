import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Libro {
  ISBN: string,
  area: string,
  autor: string,
  cantidad: number,
  disponibles: number,
  editorial: string,
  titulo: string
};

@Injectable()
export class DbProvider {

  private librosCollection: AngularFirestoreCollection<Libro>;
  public libros: Observable<Libro[]>;

  constructor(
    public http: HttpClient,
    private afs: AngularFirestore
  ) {
    console.log('Hello DbProvider Provider');
  }

  obtenerTodosLosLibros() {
    this.librosCollection = this.afs.collection<Libro>('libros');
    this.libros = this.librosCollection.valueChanges();
    return this.libros;
  }

}
