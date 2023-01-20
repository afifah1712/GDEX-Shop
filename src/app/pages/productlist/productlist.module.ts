import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductlistPageRoutingModule } from './productlist-routing.module';

import { ProductlistPage } from './productlist.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductlistPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ProductlistPage]
})
export class ProductlistPageModule {}
