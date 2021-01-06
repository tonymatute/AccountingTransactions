import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutAddComponent } from './scout-add.component';

describe('ScoutAddComponent', () => {
  let component: ScoutAddComponent;
  let fixture: ComponentFixture<ScoutAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
