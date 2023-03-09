import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscriptionn } from '../subscriptionn.model';

@Component({
  selector: 'jhi-subscriptionn-detail',
  templateUrl: './subscriptionn-detail.component.html',
})
export class SubscriptionnDetailComponent implements OnInit {
  subscriptionn: ISubscriptionn | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionn }) => {
      this.subscriptionn = subscriptionn;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
