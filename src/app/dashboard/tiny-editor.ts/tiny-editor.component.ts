import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.scss']
})
export class TinyEditorComponent {

  @Output() onEditorContentChange = new EventEmitter();

  constructor() { }

}
