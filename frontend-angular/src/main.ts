import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAppInitializer, inject } from '@angular/core';

import { AppComponent } from './app/app.component';
import { AuthService } from './app/services/auth.service';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { ErrorInterceptor } from './app/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => inject(AuthService).init()),

    provideHttpClient(withInterceptorsFromDi()),

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
});
