import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pag6PageRoutingModule } from './pag6-routing.module';

import { Pag6Page } from './pag6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pag6PageRoutingModule
  ],
  declarations: [Pag6Page]
})
export class Pag6PageModule {}
