import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutEditComponent } from './scout-edit.component';

describe('ScoutEditComponent', () => {
  let component: ScoutEditComponent;
  let fixture: ComponentFixture<ScoutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
