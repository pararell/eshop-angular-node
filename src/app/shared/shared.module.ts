import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { CartShowComponent } from './cart-show/cart-show.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CartShowComponent,
    SidebarComponent,
    ProductsListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CartShowComponent,
    SidebarComponent,
    ProductsListComponent
  ]
})
export class SharedModule { }
