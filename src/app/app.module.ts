// angular
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// universal
import { TransferHttpCacheModule } from '@nguniversal/common';

// app imports
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from './shared/shared.module';
import { LazyModule } from './utils/lazyLoadImg/lazy.module';
import { ApiService } from './services/api.service';
import { reducers } from './store/reducers/index';
import { AppEffects } from './store/effects';
import { AuthGuardAdmin } from './services/auth-admin.guard';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { BrowserHttpInterceptor } from './services/browser-http-interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// external
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export function WindowFactory() {
  return typeof window !== 'undefined' ? window : {};
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    StoreModule.forRoot( reducers ),
    HttpClientModule,
    SharedModule,
    LazyModule,
    ReactiveFormsModule,
    TransferHttpCacheModule,
    EffectsModule.forRoot([ AppEffects ]),
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent, pathMatch: 'full'  },
      { path: 'product', loadChildren: 'app/product/product.module#ProductModule' },
      { path: 'cart', loadChildren: 'app/cart/cart.module#CartModule' },
      { path: 'category/:category', component: ProductsComponent, pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardAdmin] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
      { path: '**', redirectTo: 'products' }
    ]),
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    StoreDevtoolsModule.instrument()
  ],
  providers: [ApiService, AuthService, AuthGuard, AuthGuardAdmin,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BrowserHttpInterceptor,
        multi: true,
    },
    {
      provide    : WindowService,
      useFactory : (WindowFactory)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
