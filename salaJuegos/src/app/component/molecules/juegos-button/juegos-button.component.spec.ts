import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosButtonComponent } from './juegos-button.component';

describe('JuegosButtonComponent', () => {
  let component: JuegosButtonComponent;
  let fixture: ComponentFixture<JuegosButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegosButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegosButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
