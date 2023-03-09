import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsumer } from '../consumer.model';
import { ConsumerService } from '../service/consumer.service';

@Injectable({ providedIn: 'root' })
export class ConsumerRoutingResolveService implements Resolve<IConsumer | null> {
  constructor(protected service: ConsumerService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsumer | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consumer: HttpResponse<IConsumer>) => {
          if (consumer.body) {
            return of(consumer.body);
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
