import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Simula una API que permite login con user@demo.com y 123456
    if (req.url.endsWith('/login') && req.method === 'POST') {
      const { email, password } = req.body;
      if (email === 'user@demo.com' && password === '123456') {
        return of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token' } }));
      } else {
        return of(new HttpResponse({ status: 401 }));
      }
    }
    return next.handle(req);
  }
}
