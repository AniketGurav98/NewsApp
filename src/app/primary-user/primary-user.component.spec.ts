import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryUserComponent } from './primary-user.component';

describe('PrimaryUserComponent', () => {
  let component: PrimaryUserComponent;
  let fixture: ComponentFixture<PrimaryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
