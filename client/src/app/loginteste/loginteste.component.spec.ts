import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintesteComponent } from './loginteste.component';

describe('LogintesteComponent', () => {
  let component: LogintesteComponent;
  let fixture: ComponentFixture<LogintesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogintesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
