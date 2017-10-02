import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyEditor.TsComponent } from './tiny-editor.ts.component';

describe('TinyEditor.TsComponent', () => {
  let component: TinyEditor.TsComponent;
  let fixture: ComponentFixture<TinyEditor.TsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinyEditor.TsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyEditor.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
