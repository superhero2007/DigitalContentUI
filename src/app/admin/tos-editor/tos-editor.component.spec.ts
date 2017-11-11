import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TosEditorComponent } from './tos-editor.component';

describe('TosEditorComponent', () => {
  let component: TosEditorComponent;
  let fixture: ComponentFixture<TosEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TosEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TosEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
