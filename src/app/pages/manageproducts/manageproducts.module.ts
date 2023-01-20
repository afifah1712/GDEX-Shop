import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageproductsPageRoutingModule } from './manageproducts-routing.module';

import { ManageproductsPage } from './manageproducts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageproductsPageRoutingModule
  ],
  declarations: [ManageproductsPage]
})
export class ManageproductsPageModule {}
