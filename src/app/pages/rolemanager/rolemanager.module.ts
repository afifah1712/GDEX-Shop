import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolemanagerPageRoutingModule } from './rolemanager-routing.module';

import { RolemanagerPage } from './rolemanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolemanagerPageRoutingModule
  ],
  declarations: [RolemanagerPage]
})
export class RolemanagerPageModule {}
