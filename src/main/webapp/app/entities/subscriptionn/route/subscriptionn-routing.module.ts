import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SubscriptionnComponent } from '../list/subscriptionn.component';
import { SubscriptionnDetailComponent } from '../detail/subscriptionn-detail.component';
import { SubscriptionnUpdateComponent } from '../update/subscriptionn-update.component';
import { SubscriptionnRoutingResolveService } from './subscriptionn-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const subscriptionnRoute: Routes = [
  {
    path: '',
    component: SubscriptionnComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubscriptionnDetailComponent,
    resolve: {
      subscriptionn: SubscriptionnRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubscriptionnUpdateComponent,
    resolve: {
      subscriptionn: SubscriptionnRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubscriptionnUpdateComponent,
    resolve: {
      subscriptionn: SubscriptionnRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subscriptionnRoute)],
  exports: [RouterModule],
})
export class SubscriptionnRoutingModule {}
