import { Observable } from 'rxjs/Observable';
import { Component, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';

declare const tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.scss']
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();

  editor;

  constructor() { }

  ngAfterViewInit() {
    Observable
    .interval(300)
    .take(1)
    .subscribe(() => {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['image', 'media', 'link', 'code'],
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      }
    });
  });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}

