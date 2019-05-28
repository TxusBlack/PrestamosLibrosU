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

export interface Prestamo {
  ISBN?: string,
  nomreUsuario?: string,
  libro?: string,
  activo?: boolean,
  fecha?: string,
  usuario?: string
};

@Injectable()
export class DbProvider {

  private librosCollection: AngularFirestoreCollection<Libro>;
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  private prestamosCollection: AngularFirestoreCollection<Prestamo>;

  public libros: Observable<Libro[]>;
  public usuarios: Observable<Usuario[]>;
  public prestamos: Observable<Prestamo[]>;

  constructor(
    public http: HttpClient,
    private afs: AngularFirestore
  ) {
    console.log('Hello DbProvider Provider');
    this.librosCollection = this.afs.collection<Libro>('libros');
    this.usuariosCollection = this.afs.collection<Usuario>('usuarios');
    this.prestamosCollection = this.afs.collection<Prestamo>('prestamos');
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

}
