import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCursoItemComponent } from './cart-curso-item.component';

describe('CartCursoItemComponent', () => {
  let component: CartCursoItemComponent;
  let fixture: ComponentFixture<CartCursoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCursoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCursoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
