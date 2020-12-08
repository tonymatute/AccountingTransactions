import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutTransactionsComponent } from './scout-transactions.component';

describe('ScoutTransactionsComponent', () => {
  let component: ScoutTransactionsComponent;
  let fixture: ComponentFixture<ScoutTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
