import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'subscriptionn',
        data: { pageTitle: 'ppApp.subscriptionn.home.title' },
        loadChildren: () => import('./subscriptionn/subscriptionn.module').then(m => m.SubscriptionnModule),
      },
      {
        path: 'topic',
        data: { pageTitle: 'ppApp.topic.home.title' },
        loadChildren: () => import('./topic/topic.module').then(m => m.TopicModule),
      },
      {
        path: 'consumer',
        data: { pageTitle: 'ppApp.consumer.home.title' },
        loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
