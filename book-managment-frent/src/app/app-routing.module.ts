import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { Role } from './models/role.enum';
import { ProfileComponent } from './user/profile/profile.component';

import { RouterTestingModule } from "@angular/router/testing";
import { BookComponent } from './admin/book/book.component';
import { AuthorComponent } from './admin/author/author.component';

const routes: Routes = [

  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.USER] }
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  { path: 'admin/books', component: BookComponent },
  { path: 'admin/authors', component: AuthorComponent },

  { path: '404', component: NotFoundComponent },
  { path: '401', component: UnauthorizedComponent },
];


@NgModule({
  imports: [
    RouterTestingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
