import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// angular
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// universal
import { TransferHttpCacheModule } from '@nguniversal/common';

// app imports
import { AppComponent } from './app.component';
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
import { BrowserHttpInterceptor } from './services/browser-http-interceptor';

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
    OrdersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    StoreModule.forRoot( reducers ),
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    TransferHttpCacheModule,
    EffectsModule.forRoot([ AppEffects ]),
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent, pathMatch: 'full'  },
      { path: 'products/:id', component: ProductComponent },
      { path: 'cart', component: CartComponent, pathMatch: 'full' },
      { path: 'category/:category', component: ProductsComponent, pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardAdmin], pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
      { path: '**', redirectTo: 'products', pathMatch: 'full' }
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ApiService, AuthService, AuthGuard, AuthGuardAdmin,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BrowserHttpInterceptor,
        multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
