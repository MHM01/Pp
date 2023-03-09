import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubscriptionn } from '../subscriptionn.model';
import { SubscriptionnService } from '../service/subscriptionn.service';

@Injectable({ providedIn: 'root' })
export class SubscriptionnRoutingResolveService implements Resolve<ISubscriptionn | null> {
  constructor(protected service: SubscriptionnService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscriptionn | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((subscriptionn: HttpResponse<ISubscriptionn>) => {
          if (subscriptionn.body) {
            return of(subscriptionn.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
