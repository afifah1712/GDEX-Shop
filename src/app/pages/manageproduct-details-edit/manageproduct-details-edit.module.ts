import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageproductDetailsEditPageRoutingModule } from './manageproduct-details-edit-routing.module';

import { ManageproductDetailsEditPage } from './manageproduct-details-edit.page';
import { FormatFileSizePipe } from './format-file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManageproductDetailsEditPageRoutingModule
  ],
  declarations: [FormatFileSizePipe,ManageproductDetailsEditPage]
})
export class ManageproductDetailsEditPageModule {}
