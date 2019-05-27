import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarLibroPage } from './registrar-libro';

@NgModule({
  declarations: [
    RegistrarLibroPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarLibroPage),
  ],
})
export class RegistrarLibroPageModule {}
