import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Libro {
  ISBN?: string,
  area?: string,
  autor?: string,
  cantidad?: number,
  disponibles?: number,
  editorial?: string,
  titulo?: string
};

export interface Usuario {
  nombre?: string,
  email?: string,
  telefono?: number
};

export interface TimeStamp {
  seconds?: any,
  nanoseconds?: any
};

export interface Prestamo {
  ISBN?: string,
  libro?: string,
  activo?: boolean,
  fecha?: TimeStamp,
  usuario?: string
};

export interface Devolucion {
  ISBN?: string,
  fecha?: TimeStamp,
  usuario?: string
}

@Injectable()
export class DbProvider {

  private librosCollection: AngularFirestoreCollection<Libro>;
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  private prestamosCollection: AngularFirestoreCollection<Prestamo>;
  private devolucionCollection: AngularFirestoreCollection<Devolucion>;

  public libros: Observable<Libro[]>;
  public usuarios: Observable<Usuario[]>;
  public prestamos: Observable<Prestamo[]>;
  public devolucion: Observable<Devolucion[]>;

  constructor(
    public http: HttpClient,
    private afs: AngularFirestore
  ) {
    console.log('Hello DbProvider Provider');
    this.librosCollection = this.afs.collection<Libro>('libros');
    this.usuariosCollection = this.afs.collection<Usuario>('usuarios');
    this.prestamosCollection = this.afs.collection<Prestamo>('prestamos');
    this.devolucionCollection = this.afs.collection<Prestamo>('devoluciones');
  }

  /**
   * Registro de Libros
   */

  obtenerTodosLosLibros() {
    this.libros = this.librosCollection.valueChanges();
    return this.libros;
  }

  registrarLibro(datosLibro) {
    console.log('Datos', datosLibro);
    return new Promise((resolve, reject) => {
      this.librosCollection.doc(datosLibro.ISBN).set(datosLibro).then(() => {
        resolve(true);
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    });
  }

  /**
   * Registro de Usuarios
   */

  obtenerTodosLosUsuarios() {
    this.usuarios = this.usuariosCollection.valueChanges();
    return this.usuarios;
  }

  obtenerInfoUsuario(user) {
    console.log(user);
    return this.afs.doc<Usuario>(`usuarios/${user}`).valueChanges();
  }

  registrarUsuario(usuario) {
    console.log(usuario);
    return new Promise((resolve, reject) => {
      this.usuariosCollection.doc(usuario.email).set(usuario).then(() => {
        resolve(true);
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    });
  }

  /**
   * Préstamos
   */

  obtenerTodosLosPrestamos() {
    this.prestamos = this.prestamosCollection.valueChanges();
    return this.prestamos;
  }

  registrarPrestamo(datos) {
    console.log(datos);
    return new Promise((resolve, reject) => {
      this.prestamosCollection.add(datos).then(() => {
        resolve(true);
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    });
  }

  /**
   * Devoluciones
   */

  registrarDevolucion(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.devolucionCollection.add(data).then(() => {
        resolve(true);
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    });
  }

}
