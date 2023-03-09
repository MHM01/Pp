import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubscriptionn, NewSubscriptionn } from '../subscriptionn.model';

export type PartialUpdateSubscriptionn = Partial<ISubscriptionn> & Pick<ISubscriptionn, 'id'>;

export type EntityResponseType = HttpResponse<ISubscriptionn>;
export type EntityArrayResponseType = HttpResponse<ISubscriptionn[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptionnService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/subscriptionns');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subscriptionn: NewSubscriptionn): Observable<EntityResponseType> {
    return this.http.post<ISubscriptionn>(this.resourceUrl, subscriptionn, { observe: 'response' });
  }

  update(subscriptionn: ISubscriptionn): Observable<EntityResponseType> {
    return this.http.put<ISubscriptionn>(`${this.resourceUrl}/${this.getSubscriptionnIdentifier(subscriptionn)}`, subscriptionn, {
      observe: 'response',
    });
  }

  partialUpdate(subscriptionn: PartialUpdateSubscriptionn): Observable<EntityResponseType> {
    return this.http.patch<ISubscriptionn>(`${this.resourceUrl}/${this.getSubscriptionnIdentifier(subscriptionn)}`, subscriptionn, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISubscriptionn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSubscriptionnIdentifier(subscriptionn: Pick<ISubscriptionn, 'id'>): string {
    return subscriptionn.id;
  }

  compareSubscriptionn(o1: Pick<ISubscriptionn, 'id'> | null, o2: Pick<ISubscriptionn, 'id'> | null): boolean {
    return o1 && o2 ? this.getSubscriptionnIdentifier(o1) === this.getSubscriptionnIdentifier(o2) : o1 === o2;
  }

  addSubscriptionnToCollectionIfMissing<Type extends Pick<ISubscriptionn, 'id'>>(
    subscriptionnCollection: Type[],
    ...subscriptionnsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const subscriptionns: Type[] = subscriptionnsToCheck.filter(isPresent);
    if (subscriptionns.length > 0) {
      const subscriptionnCollectionIdentifiers = subscriptionnCollection.map(
        subscriptionnItem => this.getSubscriptionnIdentifier(subscriptionnItem)!
      );
      const subscriptionnsToAdd = subscriptionns.filter(subscriptionnItem => {
        const subscriptionnIdentifier = this.getSubscriptionnIdentifier(subscriptionnItem);
        if (subscriptionnCollectionIdentifiers.includes(subscriptionnIdentifier)) {
          return false;
        }
        subscriptionnCollectionIdentifiers.push(subscriptionnIdentifier);
        return true;
      });
      return [...subscriptionnsToAdd, ...subscriptionnCollection];
    }
    return subscriptionnCollection;
  }
}
