import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { NavModule } from './modules/nav/nav.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { WindowModule } from './modules/window/window.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot(),
    NavModule,
    WindowModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
