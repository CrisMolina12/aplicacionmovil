import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pag5Page } from './pag5.page';

const routes: Routes = [
  {
    path: '',
    component: Pag5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pag5PageRoutingModule {}
