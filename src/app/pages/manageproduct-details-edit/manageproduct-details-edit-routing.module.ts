import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageproductDetailsEditPage } from './manageproduct-details-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ManageproductDetailsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageproductDetailsEditPageRoutingModule {}
