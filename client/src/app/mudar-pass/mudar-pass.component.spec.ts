import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MudarPassComponent } from './mudar-pass.component';

describe('MudarPassComponent', () => {
  let component: MudarPassComponent;
  let fixture: ComponentFixture<MudarPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MudarPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MudarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
