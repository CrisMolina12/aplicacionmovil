import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pag6Page } from './pag6.page';

const routes: Routes = [
  {
    path: '',
    component: Pag6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pag6PageRoutingModule {}
