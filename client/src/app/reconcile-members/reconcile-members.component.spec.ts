import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcileMembersComponent } from './reconcile-members.component';

describe('ReconcileMembersComponent', () => {
  let component: ReconcileMembersComponent;
  let fixture: ComponentFixture<ReconcileMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconcileMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconcileMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
