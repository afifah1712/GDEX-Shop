import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageproductsDetailsPage } from './manageproducts-details.page';

const routes: Routes = [
  {
    path: '',
    component: ManageproductsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageproductsDetailsPageRoutingModule {}
