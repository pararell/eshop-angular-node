import { Injectable } from '@angular/core';
import {  Http,  Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  readonly baseUrl = 'http://localhost:5000';

  constructor(private http: Http) {}

  getUser() {
    const userUrl = this.baseUrl + '/auth/current_user';
    return this.http.get(userUrl)
      .map(res => res.json());
  }

  handleToken(token) {
    const tokenUrl = this.baseUrl + '/api/stripe';
    return this.http.post(tokenUrl, token)
      .map(res => res.json());
  };

  loadProduct(data) {
    const productUrl = this.baseUrl + '/prod/product';
    return this.http.post(productUrl, data)
      .map(res => res.json());
  }

  loadProducts() {
    const productsUrl = this.baseUrl + '/prod/products';
    return this.http.get(productsUrl)
      .map(res => res.json())
      .map(products => ({
        products,
        categories: {
          categories: products
            .map(product => product.category)
            .reduce((prev, curr) => prev.concat(prev.includes(curr) ? [] : [curr]), []).filter(Boolean),
          tags: products
            .reduce((prev, curr) => prev.concat([...curr.tags]), []).reduce((prev, curr) => prev.concat(prev.includes(curr) ? [] : [curr]), []).filter(Boolean)
        }
      }))
  }

  getProduct(name: string) {
    const productUrl = this.baseUrl + '/prod/productId/' + name;
    return this.http.get(productUrl)
      .map(res => res.json());
  }

  getCart() {
    const cartUrl = this.baseUrl + '/cart/cart/';
    return this.http.get(cartUrl)
      .map(res => res.json());
  }

  addToCart(id: string) {
    const addToCartUrl = this.baseUrl + '/cart/addcart/' + id;
    return this.http.get(addToCartUrl)
      .map(res => res.json());
  }

  removeFromCart(id: string) {
    const removeFromCartUrl = this.baseUrl + '/cart/removefromcart/' + id;
    return this.http.get(removeFromCartUrl)
      .map(res => res.json());
  }

  removeImage(id: string) {
    const removeImage = this.baseUrl + '/admin/removeimage';
    return this.http.post(removeImage, {
        image: id
      })
      .map(res => res.json());
  }

  addProduct(product) {
    const addProduct = this.baseUrl + '/admin/addproduct';
    return this.http.post(addProduct, product)
      .map(res => res.json());
  }

  editProduct(product) {
    const eidtProduct = this.baseUrl + '/admin/udpateproduct';
    return this.http.post(eidtProduct, product)
      .map(res => res.json());
  }

  removeProduct(name: string) {
    const removeProduct = this.baseUrl + '/admin/removeproduct/' + name;
    return this.http.get(removeProduct)
      .map(res => res.json());
  }
}
