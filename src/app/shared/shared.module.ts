import { LazyModule } from './../utils/lazyLoadImg/lazy.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { CardComponent } from './card/card.component';
import { CartShowComponent } from './cart-show/cart-show.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  declarations: [
    CardComponent,
    CartShowComponent,
    SidebarComponent,
    ProductsListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    LazyModule
  ],
  providers: [],
  exports: [
    CardComponent,
    CartShowComponent,
    SidebarComponent,
    ProductsListComponent
  ]
})
export class SharedModule { }
