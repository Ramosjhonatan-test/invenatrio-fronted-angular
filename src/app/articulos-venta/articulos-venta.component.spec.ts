import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosVentaComponent } from './articulos-venta.component';

describe('ArticulosVentaComponent', () => {
  let component: ArticulosVentaComponent;
  let fixture: ComponentFixture<ArticulosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticulosVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
