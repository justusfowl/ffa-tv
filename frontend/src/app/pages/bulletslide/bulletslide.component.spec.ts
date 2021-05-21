import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletslideComponent } from './bulletslide.component';

describe('BulletslideComponent', () => {
  let component: BulletslideComponent;
  let fixture: ComponentFixture<BulletslideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
