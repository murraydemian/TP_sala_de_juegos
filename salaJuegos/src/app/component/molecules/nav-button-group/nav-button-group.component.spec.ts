import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavButtonGroupComponent } from './nav-button-group.component';

describe('NavButtonGroupComponent', () => {
  let component: NavButtonGroupComponent;
  let fixture: ComponentFixture<NavButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
