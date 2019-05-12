import { OrderComponent } from './order/order.component';
import { AuthGuardAdmin } from './services/auth-admin.guard';
import { AuthGuard } from './services/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

export const routesAll = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
  { path: 'en/products', component: ProductsComponent },
  { path: 'en/product', loadChildren: 'app/product/product.module#ProductModule' },
  { path: 'en/cart', loadChildren: 'app/cart/cart.module#CartModule' },
  { path: 'en/category/:category', component: ProductsComponent },
  { path: 'en/dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardAdmin] },
  { path: 'en/orders', component: OrdersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'en/order/:id', component: OrderComponent, pathMatch: 'full' },
  { path: 'en/eshop', loadChildren: 'app/eshop/eshop.module#EshopModule' },

  { path: 'sk/produkty', component: ProductsComponent  },
  { path: 'sk/produkt', loadChildren: 'app/product/product.module#ProductModule' },
  { path: 'sk/kosik', loadChildren: 'app/cart/cart.module#CartModule' },
  { path: 'sk/kategoria/:category', component: ProductsComponent },
  { path: 'sk/dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardAdmin] },
  { path: 'sk/objednavky', component: OrdersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'sk/objednavka/:id', component: OrderComponent, pathMatch: 'full' },
  { path: 'sk/eshop', loadChildren: 'app/eshop/eshop.module#EshopModule' },

  { path: 'cs/produkty', component: ProductsComponent  },
  { path: 'cs/produkt', loadChildren: 'app/product/product.module#ProductModule' },
  { path: 'cs/kosik', loadChildren: 'app/cart/cart.module#CartModule' },
  { path: 'cs/kategorie/:category', component: ProductsComponent },
  { path: 'cs/dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardAdmin] },
  { path: 'cs/objednavky', component: OrdersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'cs/objednavka/:id', component: OrderComponent, pathMatch: 'full' },
  { path: 'cs/eshop', loadChildren: 'app/eshop/eshop.module#EshopModule' },

  { path: '**', redirectTo: '' }
];
