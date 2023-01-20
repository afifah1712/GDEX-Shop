import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageproductsDetailsPageRoutingModule } from './manageproducts-details-routing.module';

import { ManageproductsDetailsPage } from './manageproducts-details.page';
import { FormatFileSizePipe } from './format-file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManageproductsDetailsPageRoutingModule
  ],
  declarations: [ManageproductsDetailsPage,FormatFileSizePipe]
})
export class ManageproductsDetailsPageModule {}
