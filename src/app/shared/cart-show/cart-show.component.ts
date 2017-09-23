import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-show',
  templateUrl: './cart-show.component.html',
  styleUrls: ['./cart-show.component.scss']
})
export class CartShowComponent implements OnInit {
  @Input()  items:  number;
  @Output() add:    EventEmitter<void> = new EventEmitter<void>();
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
