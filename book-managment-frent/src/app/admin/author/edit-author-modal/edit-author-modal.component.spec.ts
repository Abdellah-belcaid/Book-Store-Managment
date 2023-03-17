import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuthorModalComponent } from './edit-author-modal.component';

describe('EditAuthorModalComponent', () => {
  let component: EditAuthorModalComponent;
  let fixture: ComponentFixture<EditAuthorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAuthorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuthorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
