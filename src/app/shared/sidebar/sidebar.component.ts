import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {
  @Input() categories: any;
  @Input() activeCategory?: string;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() price: number;

  @Output() changePrice: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


}
