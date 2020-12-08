import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultTransactionsComponent } from './adult-transactions.component';

describe('AdultTransactionsComponent', () => {
  let component: AdultTransactionsComponent;
  let fixture: ComponentFixture<AdultTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
