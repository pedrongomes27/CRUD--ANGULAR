import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooduComponent } from './toodu.component';

describe('TooduComponent', () => {
  let component: TooduComponent;
  let fixture: ComponentFixture<TooduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
