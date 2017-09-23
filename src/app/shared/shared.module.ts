import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { CartShowComponent } from './cart-show/cart-show.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CartShowComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    BrowserModule
  ],
  providers: [],
  exports: [HeaderComponent, FooterComponent, CardComponent, CartShowComponent]
})
export class SharedModule { }
