import { getMultipleValuesInSingleSelectionError } from "@angular/cdk/collections";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private TOKEN_HEADER = 'Authorization';

    constructor(private authService: AuthService) { }


    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        //add token to header
        const token = this.authService.getToken();
        let authReq = req;
        if (token != null && !req.headers.has('Authorization')) {           
            authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        }
        console.log(authReq);
        return next.handle(authReq);
    }

}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];