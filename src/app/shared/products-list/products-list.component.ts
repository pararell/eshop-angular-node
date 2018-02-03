import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input()  products:  any;
  @Input()  cartIds:   any;
  @Output() addProduct:    EventEmitter<any> = new EventEmitter<any>();
  @Output() removeProduct: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  onAddProduct(id) {
    this.addProduct.emit(id);
  }

  onRemoveProduct(id) {
    this.removeProduct.emit(id);
  }
}
