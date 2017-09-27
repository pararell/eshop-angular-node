import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { CartShowComponent } from './cart-show/cart-show.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CartShowComponent,
    SidebarComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    RouterModule
  ],
  providers: [],
  exports: [HeaderComponent, FooterComponent, CardComponent, CartShowComponent, SidebarComponent]
})
export class SharedModule { }
