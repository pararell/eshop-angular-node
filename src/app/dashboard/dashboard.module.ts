import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { TinyEditorComponent } from './tiny-editor.ts/tiny-editor.component';
import {  FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

const DASHBOARD_ROUTER: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forChild(DASHBOARD_ROUTER)
  ],
  declarations: [ProductsEditComponent, OrdersEditComponent, DashboardComponent, TinyEditorComponent]
})
export class DashboardModule { }
