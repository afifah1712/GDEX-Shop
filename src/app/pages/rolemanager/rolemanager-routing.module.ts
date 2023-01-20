import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolemanagerPage } from './rolemanager.page';

const routes: Routes = [
  {
    path: '',
    component: RolemanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolemanagerPageRoutingModule {}
