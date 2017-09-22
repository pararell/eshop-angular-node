import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { State } from './../store/reducers/index';
import { Store } from '@ngrx/store';
import * as actions from './../store/actions'
import * as fromRoot from '../store/reducers';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<any>;
  productLoading$: Observable<any>;
  activeTab: String = 'first';

  constructor(private _route: ActivatedRoute,  private store: Store<State>) {

    _route.params
    .map(params => params['id'])
    .subscribe(params => {
      this.store.dispatch(new actions.GetProduct(params));
    });

    this.product$ = this.store.select(fromRoot.getProduct);
    this.productLoading$ = this.store.select(fromRoot.getProductLoading);

   }

  ngOnInit() {
  }

}
