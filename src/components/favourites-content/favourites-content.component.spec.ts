import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesContentComponent } from './favourites-content.component';

describe('FavouritesContentComponent', () => {
  let component: FavouritesContentComponent;
  let fixture: ComponentFixture<FavouritesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
