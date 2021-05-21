import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): boolean {
        return false;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;        
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return false;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false;
    }    
}