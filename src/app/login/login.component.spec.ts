import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when inputs are empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call AuthService login on form submit when form is valid', () => {
    const mockUser = { email: 'test@example.com', password: '123456' };
    authServiceSpy.login.and.returnValue(true);
    component.loginForm.setValue(mockUser);

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(mockUser.email, mockUser.password);
  });

  it('should not call AuthService login when form is invalid', () => {
    component.loginForm.setValue({ email: 'test', password: '' });

    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
