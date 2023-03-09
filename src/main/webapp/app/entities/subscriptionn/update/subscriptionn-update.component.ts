import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SubscriptionnFormService, SubscriptionnFormGroup } from './subscriptionn-form.service';
import { ISubscriptionn } from '../subscriptionn.model';
import { SubscriptionnService } from '../service/subscriptionn.service';
import { ITopic } from 'app/entities/topic/topic.model';
import { TopicService } from 'app/entities/topic/service/topic.service';
import { IConsumer } from 'app/entities/consumer/consumer.model';
import { ConsumerService } from 'app/entities/consumer/service/consumer.service';

@Component({
  selector: 'jhi-subscriptionn-update',
  templateUrl: './subscriptionn-update.component.html',
})
export class SubscriptionnUpdateComponent implements OnInit {
  isSaving = false;
  subscriptionn: ISubscriptionn | null = null;

  topicsSharedCollection: ITopic[] = [];
  consumersSharedCollection: IConsumer[] = [];

  editForm: SubscriptionnFormGroup = this.subscriptionnFormService.createSubscriptionnFormGroup();

  constructor(
    protected subscriptionnService: SubscriptionnService,
    protected subscriptionnFormService: SubscriptionnFormService,
    protected topicService: TopicService,
    protected consumerService: ConsumerService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTopic = (o1: ITopic | null, o2: ITopic | null): boolean => this.topicService.compareTopic(o1, o2);

  compareConsumer = (o1: IConsumer | null, o2: IConsumer | null): boolean => this.consumerService.compareConsumer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionn }) => {
      this.subscriptionn = subscriptionn;
      if (subscriptionn) {
        this.updateForm(subscriptionn);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriptionn = this.subscriptionnFormService.getSubscriptionn(this.editForm);
    if (subscriptionn.id !== null) {
      this.subscribeToSaveResponse(this.subscriptionnService.update(subscriptionn));
    } else {
      this.subscribeToSaveResponse(this.subscriptionnService.create(subscriptionn));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptionn>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(subscriptionn: ISubscriptionn): void {
    this.subscriptionn = subscriptionn;
    this.subscriptionnFormService.resetForm(this.editForm, subscriptionn);

    this.topicsSharedCollection = this.topicService.addTopicToCollectionIfMissing<ITopic>(this.topicsSharedCollection, subscriptionn.id);
    this.consumersSharedCollection = this.consumerService.addConsumerToCollectionIfMissing<IConsumer>(
      this.consumersSharedCollection,
      subscriptionn.id
    );
  }

  protected loadRelationshipsOptions(): void {
    this.topicService
      .query()
      .pipe(map((res: HttpResponse<ITopic[]>) => res.body ?? []))
      .pipe(map((topics: ITopic[]) => this.topicService.addTopicToCollectionIfMissing<ITopic>(topics, this.subscriptionn?.id)))
      .subscribe((topics: ITopic[]) => (this.topicsSharedCollection = topics));

    this.consumerService
      .query()
      .pipe(map((res: HttpResponse<IConsumer[]>) => res.body ?? []))
      .pipe(
        map((consumers: IConsumer[]) => this.consumerService.addConsumerToCollectionIfMissing<IConsumer>(consumers, this.subscriptionn?.id))
      )
      .subscribe((consumers: IConsumer[]) => (this.consumersSharedCollection = consumers));
  }
}
