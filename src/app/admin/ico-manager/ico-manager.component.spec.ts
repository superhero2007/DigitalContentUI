import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoManagerComponent } from './ico-manager.component';

describe('IcoManagerComponent', () => {
  let component: IcoManagerComponent;
  let fixture: ComponentFixture<IcoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
