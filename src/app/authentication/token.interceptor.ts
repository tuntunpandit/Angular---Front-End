import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _authS: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Initial', request);
        if (this._authS.getJwtToken()) {
            request = this.addToken(request, this._authS.getJwtToken());
        }
        // console.log('If jwt token', request);
        return next.handle(request).pipe(
            catchError(error => {
                console.log("errrorr", error);
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(error);
                }
            }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this._authS.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(request, token.jwt));
                }));
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                })
            );
        }
    }
}

