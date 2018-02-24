// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// app imports
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './services/api.service';
import { reducers } from './store/reducers/index';
import { AppEffects } from './store/effects';
import { AuthGuardAdmin } from './services/auth-admin.guard';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

// external
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CategoryComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    StoreModule.forRoot( reducers ),
    SharedModule,
    ReactiveFormsModule,
    HttpModule,
    EffectsModule.forRoot([ AppEffects ]),
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent, pathMatch: 'full'  },
      { path: 'products/:id', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'category/:category', component: CategoryComponent },
      { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardAdmin] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'products' }
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ApiService, AuthService, AuthGuard, AuthGuardAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
