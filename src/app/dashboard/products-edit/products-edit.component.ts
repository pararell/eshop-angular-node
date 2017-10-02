import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';
import { State } from './../../store/reducers/index';
import * as fromRoot from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as actions from './../../store/actions'

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {
  productEditForm: FormGroup;
  uploader: FileUploader;
  images$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store<State> ) {  this.createForm(); }

  ngOnInit() {
    this.images$ = this.store.select(fromRoot.getUser).filter(Boolean).map(user => user.images);
    this.uploader = new FileUploader({
      url: '/admin/addimage',
      headers: [{name: 'Accept', value: 'application/json'}],
      itemAlias: 'file',
      autoUpload: true,
  });
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
 }

 onEditorChange(data) {
   this.productEditForm.patchValue( { descriptionFull: [ data ] });
 }

 createForm() {
  this.productEditForm = this.fb.group({
    titleUrl: ['', Validators.required ],
    title: ['', Validators.required],
    description: '',
    salePrice: '',
    regularPrice: '',
    tags: '',
    categories: '',
    visibility: '',
    onStock: '',
    onSale: '',
    shiping: '',
    mainImage: '',
    images: [],
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
  this.store.dispatch(new actions.RemoveProductImage(image));
}

 onSubmit() {
  this.images$.first().subscribe(images => {
    this.productEditForm.patchValue( { images: images });
    this.store.dispatch(new actions.AddProduct( this.productEditForm.value));
  })

 }



}
