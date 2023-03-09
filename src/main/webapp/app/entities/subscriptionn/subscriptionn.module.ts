import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SubscriptionnComponent } from './list/subscriptionn.component';
import { SubscriptionnDetailComponent } from './detail/subscriptionn-detail.component';
import { SubscriptionnUpdateComponent } from './update/subscriptionn-update.component';
import { SubscriptionnDeleteDialogComponent } from './delete/subscriptionn-delete-dialog.component';
import { SubscriptionnRoutingModule } from './route/subscriptionn-routing.module';

@NgModule({
  imports: [SharedModule, SubscriptionnRoutingModule],
  declarations: [SubscriptionnComponent, SubscriptionnDetailComponent, SubscriptionnUpdateComponent, SubscriptionnDeleteDialogComponent],
})
export class SubscriptionnModule {}
