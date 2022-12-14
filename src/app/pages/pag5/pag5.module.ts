import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pag5PageRoutingModule } from './pag5-routing.module';

import { Pag5Page } from './pag5.page';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pag5PageRoutingModule,
    ReactiveFormsModule,
   
    
  ],
  declarations: [Pag5Page]
})
export class Pag5PageModule {}
