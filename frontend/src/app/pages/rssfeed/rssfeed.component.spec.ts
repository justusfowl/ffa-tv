import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RssfeedComponent } from './rssfeed.component';

describe('RssfeedComponent', () => {
  let component: RssfeedComponent;
  let fixture: ComponentFixture<RssfeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RssfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
