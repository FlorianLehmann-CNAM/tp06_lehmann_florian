import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostComponentComponent } from './lost-component.component';

describe('LostComponentComponent', () => {
  let component: LostComponentComponent;
  let fixture: ComponentFixture<LostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
