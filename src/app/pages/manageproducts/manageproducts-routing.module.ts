import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageproductsPage } from './manageproducts.page';

const routes: Routes = [
  {
    path: '',
    component: ManageproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageproductsPageRoutingModule {}
