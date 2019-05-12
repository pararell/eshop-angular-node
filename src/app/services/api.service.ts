import { WindowService } from './window.service';
import { map } from 'rxjs/operators';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = '';

  constructor(
      private readonly  http: HttpClient,
      private readonly _injector: Injector,
      private readonly _window  : WindowService,
      @Inject(PLATFORM_ID)
      private _platformId : Object
      ) {

      if (isPlatformServer(this._platformId)) {
        const serverRequest = REQUEST ? this._injector.get(REQUEST) : '';
        this.baseUrl = serverRequest ? `${serverRequest.protocol}://${serverRequest.get('Host')}` : '';
      }

      if (isPlatformBrowser(this._platformId)) {
        this.baseUrl = this._window.location.origin || '';
      }
  }

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

  sendContact(req) {
    const sendContact = this.baseUrl + '/api/contact';
    return this.http.post(sendContact, req);
  }

  // products
  loadProducts(req) {
    const productsUrl = this.baseUrl + '/prod/products/' + req.lang + '/' + req.page + '/' + req.sort;
    return this.http.get(productsUrl).pipe(map((data: any) => ({
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
    })))
  }

  loadCategoryProducts(req) {
    const productsUrl = this.baseUrl + '/prod/categoryProducts/' + req.lang + '/' + req.category + '/' + req.page + '/' + req.sort;
    return this.http.get(productsUrl).pipe(map((data: any) => ({
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
    })))
  }


  loadCategories(payload) {
    const categoriesUrl = this.baseUrl + '/prod/categories/' + payload.lang;
    return this.http.get(categoriesUrl)
  }

  loadProductsSearch(query: string) {
    const productUrl = this.baseUrl + '/prod/productQuery/' + query;
    return this.http.get(productUrl);
  }

  getProduct(params) {
    const productUrl = this.baseUrl + '/prod/productId/' + params;
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

  addToCart(params: string) {
    const addToCartUrl = this.baseUrl + '/cartApi/addcart/' + params;
    return this.http.get(addToCartUrl);
  }

  removeFromCart(params: string) {
    const removeFromCartUrl = this.baseUrl + '/cartApi/removefromcart/' + params;
    return this.http.get(removeFromCartUrl);
  }

  // dashboard
  addProductImagesUrl({imageUrl, titleUrl}) {
    const addImageUrl = this.baseUrl + '/admin/addimageurl' + (titleUrl ? '/' + titleUrl : '');
    return this.http.post(addImageUrl, { imageUrl });
  }

  removeImage({image, titleUrl}) {
    const removeImage = this.baseUrl + '/admin/removeimage' + (titleUrl ? '/' + titleUrl : '');
    return this.http.post(removeImage, { image });
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

  getAllTranslations() {
    const translationsUrl = this.baseUrl + '/admin/translations';
    return this.http.get(translationsUrl);
  }

  getLangTranslations(lang) {
    const translationsUrl = this.baseUrl + '/admin/translations/' + lang;
    return this.http.get(translationsUrl);
  }

  editTranslation({lang, keys}) {
    const translationsUpdateUrl = this.baseUrl + '/admin/updateTranslation/' + lang;
    return this.http.post(translationsUpdateUrl, { keys : keys });
  }

  changeCurrencyValue(currency) {
    const currencyConvertUrl = 'https://free.currencyconverterapi.com/api/v5/convert?q=EUR_' + currency + '&compact=y';
    return this.http.get(currencyConvertUrl).pipe(map(res => res['EUR_' + currency]));
  }

  getLocation$() {
    const locationFindUrl = 'https://ipinfo.io';
    return this.http.get(locationFindUrl)
      .pipe(map((response: any ) => {
        const country = response.country ? response.country.toLowerCase() : '';
        if (country === 'sk') {
          return country;
        } else if (country === 'cz') {
          return 'cs';
        } else {
          return 'en';
        }

      }))
  }


}
