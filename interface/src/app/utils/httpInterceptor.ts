import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Utils } from "../../../../utils/utils";

@Injectable()
export class HttpInterceptorWithCredentials implements HttpInterceptor {

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let sessionID = sessionStorage.getItem("SessionID");

    if (!sessionID) {
        sessionID = Utils.createDomId(32);
        sessionStorage.setItem("SessionID", sessionID);
    }

    const copiedReq = request.clone({
        headers: request.headers.set("SessionID", sessionID),
    });

    return next.handle(copiedReq );
}
}