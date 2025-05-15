import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacityPageComponent } from './privacity-page.component';

describe('PrivacityPageComponent', () => {
  let component: PrivacityPageComponent;
  let fixture: ComponentFixture<PrivacityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacityPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
