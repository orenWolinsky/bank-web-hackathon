import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JambatronComponent } from './jambatron.component';

describe('JambatronComponent', () => {
  let component: JambatronComponent;
  let fixture: ComponentFixture<JambatronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JambatronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JambatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
