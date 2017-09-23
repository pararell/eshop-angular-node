import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './services/api.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers/index';
import { AppEffects } from './store/effects';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    StoreModule.forRoot( reducers ),
    SharedModule,
    ReactiveFormsModule,
    HttpModule,
     EffectsModule.forRoot([ AppEffects ]),
    RouterModule.forRoot([
      { path: '',  pathMatch: 'full', redirectTo: 'products' },
      { path: 'products',  pathMatch: 'full', component: ProductsComponent },
      { path: 'products/:id', component: ProductComponent },
      { path: 'cart', component: CartComponent }
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
