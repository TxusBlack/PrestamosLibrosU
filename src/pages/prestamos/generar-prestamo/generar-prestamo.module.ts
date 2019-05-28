import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerarPrestamoPage } from './generar-prestamo';

@NgModule({
  declarations: [
    GenerarPrestamoPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerarPrestamoPage),
  ],
})
export class GenerarPrestamoPageModule {}
