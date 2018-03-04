import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  readonly baseUrl = '';

  constructor(private http: HttpClient) {}

  getUser() {
    const userUrl = this.baseUrl + '/auth/current_user';
    return this.http.get(userUrl);
  }

  handleToken(token) {
    const tokenUrl = this.baseUrl + '/api/stripe';
    return this.http.post(tokenUrl, token);
  };

  loadProduct(data) {
    const productUrl = this.baseUrl + '/prod/product';
    return this.http.post(productUrl, data);
  }

  loadProducts() {
    const productsUrl = this.baseUrl + '/prod/products';
    return this.http.get(productsUrl)
      .map((products: any) => ({
        products : products
          .map(product => ({...product, tags: product.tags.map(tag => tag ? tag.toLowerCase() : '')})),
        categories: {
          categories: products
            .map(product => product.category)
            .filter(Boolean),
          tags: products
            .map(product => product.tags
              .filter(Boolean))
            .reduce((tagsArr, tags) => tagsArr.concat(
              tags.reduce((tagArr, tag) => tagArr.concat(tag.split(',')), [] )),
              [])
            }
      }))
  }

  getProduct(name: string) {
    const productUrl = this.baseUrl + '/prod/productId/' + name;
    return this.http.get(productUrl);
  }

  getCart() {
    const cartUrl = this.baseUrl + '/cartApi/cart/';
    return this.http.get(cartUrl);
  }

  addToCart(id: string) {
    const addToCartUrl = this.baseUrl + '/cartApi/addcart/' + id;
    return this.http.get(addToCartUrl);
  }

  removeFromCart(id: string) {
    const removeFromCartUrl = this.baseUrl + '/cartApi/removefromcart/' + id;
    return this.http.get(removeFromCartUrl);
  }

  removeImage(id: string) {
    const removeImage = this.baseUrl + '/admin/removeimage';
    return this.http.post(removeImage, { image: id });
  }

  addProduct(product) {
    const addProduct = this.baseUrl + '/admin/addproduct';
    return this.http.post(addProduct, product);
  }

  editProduct(product) {
    const eidtProduct = this.baseUrl + '/admin/udpateproduct';
    return this.http.post(eidtProduct, product);
  }

  removeProduct(name: string) {
    const removeProduct = this.baseUrl + '/admin/removeproduct/' + name;
    return this.http.get(removeProduct);
  }
}
