import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITopic } from '../topic.model';
import { TopicService } from '../service/topic.service';

@Injectable({ providedIn: 'root' })
export class TopicRoutingResolveService implements Resolve<ITopic | null> {
  constructor(protected service: TopicService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITopic | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((topic: HttpResponse<ITopic>) => {
          if (topic.body) {
            return of(topic.body);
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
