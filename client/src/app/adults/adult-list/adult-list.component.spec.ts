import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultListComponent } from './adult-list.component';

describe('AdultListComponent', () => {
  let component: AdultListComponent;
  let fixture: ComponentFixture<AdultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
