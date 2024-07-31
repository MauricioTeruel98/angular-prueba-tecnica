import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-prueba'`, () => {
    expect(component.title).toEqual('angular-prueba');
  });

  it('should apply filters and log category and limit', () => {
    spyOn(console, 'log');
    component.applyFilters();
    expect(console.log).toHaveBeenCalledWith('Category:', component.selectedCategory, 'Limit:', component.selectedLimit);
  });
});
