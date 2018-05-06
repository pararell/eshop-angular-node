import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import * as fromRoot from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as actions from './../../store/actions'


@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit, OnDestroy {
  @Input() action: string;

  productEditForm: FormGroup;
  uploader: FileUploader;
  images$: Observable<any>;
  sendRequest: Boolean = false;
  descriptionFull: BehaviorSubject<string> = new BehaviorSubject('');
  product$: Observable<any>;
  productSub: Subscription;

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State> ) {
     this.createForm();
     this.product$ = this.store.select(fromRoot.getProduct);
    }

  ngOnInit() {
    this.images$ = this.store.select(fromRoot.getUser)
      .filter(Boolean)
      .map(user => user.images);

    this.uploader = new FileUploader({
      url: '/admin/addimage',
      headers: [{name: 'Accept', value: 'application/json'}],
      itemAlias: 'file',
      autoUpload: true,
  });
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
 }

 ngOnDestroy() {
  if (this.productSub) {
    this.productSub.unsubscribe();
  }

 }

 onEditorChange(value) {
   this.productEditForm.patchValue( { descriptionFull: value });
 }

 createForm() {
  this.productEditForm = this.fb.group({
    titleUrl: ['', Validators.required ],
    title: '',
    description: '',
    salePrice: '',
    regularPrice: '',
    tags: '',
    categories: '',
    visibility: 'visible',
    stock: 'onStock',
    onSale: false,
    shiping: 'shiping',
    mainImage: '',
    images: [],
    imageUrl: '',
    descriptionFull: ''
  });
 }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
   const parseResponse =  JSON.parse(response);
   this.store.dispatch(new actions.AddProductImage(parseResponse));
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log( JSON.parse(response) );
  }

  onRemoveImage(image: string) {
    this.store.dispatch(new actions.RemoveProductImage({image: image, titleUrl: this.productEditForm.get('titleUrl').value} ));
  }

 onSubmit() {

   switch (this.action) {
     case 'add':
     this.images$
      .first()
      .subscribe(images => {
        if (images.length) {
         this.productEditForm.patchValue( { images: images });
        }
        this.store.dispatch(new actions.AddProduct(this.productEditForm.value));
    })
     break;

     case 'edit':
     this.images$
      .first()
      .subscribe(images => {
        if (images.length) {
          this.productEditForm.patchValue( { images: images });
        }

      const editProduct = Object.keys(this.productEditForm.value)
        .filter(key => !!this.productEditForm.value[key] )
        .reduce((prev, curr) =>  ({ ...prev, [curr] : this.productEditForm.value[curr] }) , {})

      this.store.dispatch(new actions.EditProduct( editProduct));
    });
     break;

     case 'remove':
     this.store.dispatch(new actions.RemoveProduct( this.productEditForm.get('titleUrl').value ));
     break;
   }

   this.sendRequest = true;

 }

 addImageUrl() {
  this.store.dispatch(new actions.AddProductImagesUrl( { imageUrl: this.productEditForm.get('imageUrl').value, titleUrl: this.productEditForm.get('titleUrl').value }));
 }

 openForm() {
  this.sendRequest = false;
 }

 findProduct() {
   const titleUrl = this.productEditForm.get('titleUrl').value;
   if (titleUrl) {
    this.store.dispatch(new actions.GetProduct(titleUrl));

    this.productSub = this.product$
    .filter(product => product && product.titleUrl)
    .subscribe((product) => {

      const newForm = {
        titleUrl: product.titleUrl,
        title: product.title,
        description: product.description,
        salePrice: product.salePrice,
        regularPrice: product.regularPrice,
        tags: product.tags.reduce((string, tag) => (string ? string + ',' : string) + tag , ''),
        categories: product.categories.reduce((string, tag) => (string ? string + ',' : string) + tag , ''),
        visibility: 'visible',
        stock: product.stock,
        onSale: true,
        shiping: 'shiping',
        mainImage: product.mainImage ? product.mainImage.url : '',
        images: product.images,
        descriptionFull: product.descriptionFull,
        imageUrl: ''
      };

      this.uploader = new FileUploader({
        url: '/admin/addimage/' + product.titleUrl,
        headers: [{name: 'Accept', value: 'application/json'}],
        itemAlias: 'file',
        autoUpload: true,
    });

      const desc = product.descriptionFull.length ? product.descriptionFull[0] : '';

      this.descriptionFull.next(desc);
      this.productEditForm.setValue(newForm);

    });
   }
 }



}
