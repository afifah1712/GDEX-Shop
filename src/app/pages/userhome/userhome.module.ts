import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserhomePageRoutingModule } from './userhome-routing.module';

import { UserhomePage } from './userhome.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserhomePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [UserhomePage]
})
export class UserhomePageModule {}
