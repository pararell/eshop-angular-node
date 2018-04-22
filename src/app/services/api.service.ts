import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  // readonly baseUrl = 'http://localhost:5000';
  readonly baseUrl = '';

  constructor(private http: HttpClient) {}

  // auth

  getUser() {
    const userUrl = this.baseUrl + '/auth/current_user';
    return this.http.get(userUrl);
  }

  // orders

  handleToken(token) {
    const tokenUrl = this.baseUrl + '/api/stripe';
    return this.http.post(tokenUrl, token);
  };

  makeOrder(req) {
    const addOrder = this.baseUrl + '/api/order/add';
    return this.http.post(addOrder, req);
  }

  // products
  loadProducts(req) {
    const productsUrl = this.baseUrl + '/prod/products/' + req.page + '/' + req.sort;
    return this.http.get(productsUrl)
      .map((data: any) => ({
        products : data.docs
          .map(product => ({...product,
              categories: product.categories.filter(Boolean).map(category => category.toLowerCase()),
              tags: product.tags.map(tag => tag ? tag.toLowerCase() : '')})),
        pagination: {
          limit: data.limit,
          page: data.page,
          pages: data.pages,
          total: data.total,
          range: Array(data.pages).fill(0).map((v, i) => i + 1)
        },
    }))
  }

  loadCategoryProducts(req) {
    const productsUrl = this.baseUrl + '/prod/categoryProducts/' + req.category + '/' + req.page + '/' + req.sort;
    return this.http.get(productsUrl)
      .map((data: any) => ({
        products : data.docs
          .map(product => ({...product,
              categories: product.categories.filter(Boolean).map(category => category.toLowerCase()),
              tags: product.tags.map(tag => tag ? tag.toLowerCase() : '')})),
        pagination: {
          limit: data.limit,
          page: data.page,
          pages: data.pages,
          total: data.total,
          range: Array(data.pages).fill(0).map((v, i) => i + 1)
        },
        category: req.category
    }))
  }


  loadCategories() {
    const categoriesUrl = this.baseUrl + '/prod/categories';
    return this.http.get(categoriesUrl)
  }

  loadProductsSearch(query: string) {
    const productUrl = this.baseUrl + '/prod/productQuery/' + query;
    return this.http.get(productUrl);
  }

  getProduct(name: string) {
    const productUrl = this.baseUrl + '/prod/productId/' + name;
    return this.http.get(productUrl);
  }

  getUserOrders(req) {
    const userOrderUrl = this.baseUrl + '/prod/orders';
    return this.http.post(userOrderUrl, req);
  }

  // cart

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

  // dashboard

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

  getOrders() {
    const ordersUrl = this.baseUrl + '/admin/orders';
    return this.http.get(ordersUrl);
  }

  getOrder(id: string) {
    const orderUrl = this.baseUrl + '/admin/orderId/' + id;
    return this.http.get(orderUrl);
  }

  updateOrder(req) {
    const orderUpdateUrl = this.baseUrl + '/admin/updateOrder';
    return this.http.post(orderUpdateUrl, req);
  }


}
