import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Provider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

]

const providers: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  // { provide: HAMMER_LOADER, useFactory: LoadHammer },
  AuthGuard,
  AdminGuard
];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
