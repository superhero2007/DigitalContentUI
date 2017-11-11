import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapFormComponent } from './roadmap-form.component';

describe('RoadmapFormComponent', () => {
  let component: RoadmapFormComponent;
  let fixture: ComponentFixture<RoadmapFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
