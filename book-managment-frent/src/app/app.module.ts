import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Module
import { MaterialModule } from './app-material.module';

// Angular components
import { AppComponent } from './app.component';

import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';

import { AddAuthorModalComponent } from './admin/author/add-author-modal/add-author-modal.component';
import { AuthorComponent } from './admin/author/author.component';
import { EditAuthorModalComponent } from './admin/author/edit-author-modal/edit-author-modal.component';
import { AddBookModalComponent } from './admin/book/add-book-modal/add-book-modal.component';
import { BookComponent } from './admin/book/book.component';
import { EditBookModalComponent } from './admin/book/edit-book-modal/edit-book-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './services/authentication.service';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { EditUserComponent } from './user/profile/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BookComponent,
    AddBookModalComponent,
    AddAuthorModalComponent,
    EditAuthorModalComponent,
    EditBookModalComponent,
    //new added
    NotFoundComponent,
    UnauthorizedComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,


  ],
  providers: [BookService, AuthorService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
