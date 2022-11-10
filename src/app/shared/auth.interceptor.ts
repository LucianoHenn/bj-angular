import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { TokenService } from "../shared/token.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken,
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return next.handle(req);
    }
}