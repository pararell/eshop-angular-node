import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
 constructor( private http: Http) {}

 getUser() {
  const userUrl = '/api/current_user';
  return this.http.get(userUrl)
    .map(res => res.json());
 }

 handleToken(token) {
  const tokenUrl = '/api/stripe';
  return this.http.post(tokenUrl, token)
    .map(res => res.json());
 };

 loadProduct(data) {
  const productUrl = '/prod/product';
  return this.http.post(productUrl, data)
    .map(res => res.json());
 }

 loadProducts() {
  const productsUrl = '/prod/products';
  return this.http.get(productsUrl)
    .map(res => res.json())
    .map(products => ({
      products,
      categories: {
        categories: products.map(product => product.category).reduce((prev, curr) => prev.concat(prev.includes(curr) ? [] : [curr]) , []).filter(Boolean),
        tags: products.reduce((prev, curr) => prev.concat([...curr.tags]), []).reduce((prev, curr) => prev.concat(prev.includes(curr) ? [] : [curr]) , []).filter(Boolean)
      }
    }))
 }

 getProduct(name: string) {
  const productUrl = '/prod/productId/' + name;
  return this.http.get(productUrl)
    .map(res => res.json());
 }

 getCart() {
  const cartUrl = '/prod/cart/';
  return this.http.get(cartUrl)
    .map(res => res.json());
 }

 addToCart(id: string) {
  const addToCartUrl = '/prod/addcart/' + id;
  return this.http.get(addToCartUrl)
    .map(res => res.json());
 }

 removeFromCart(id: string) {
  const removeFromCartUrl = '/prod/removefromcart/' + id;
  return this.http.get(removeFromCartUrl)
    .map(res => res.json());
 }

}
