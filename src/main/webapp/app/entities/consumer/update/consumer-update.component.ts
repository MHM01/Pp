import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConsumerFormService, ConsumerFormGroup } from './consumer-form.service';
import { IConsumer } from '../consumer.model';
import { ConsumerService } from '../service/consumer.service';

@Component({
  selector: 'jhi-consumer-update',
  templateUrl: './consumer-update.component.html',
})
export class ConsumerUpdateComponent implements OnInit {
  isSaving = false;
  consumer: IConsumer | null = null;

  editForm: ConsumerFormGroup = this.consumerFormService.createConsumerFormGroup();

  constructor(
    protected consumerService: ConsumerService,
    protected consumerFormService: ConsumerFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consumer }) => {
      this.consumer = consumer;
      if (consumer) {
        this.updateForm(consumer);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consumer = this.consumerFormService.getConsumer(this.editForm);
    if (consumer.id !== null) {
      this.subscribeToSaveResponse(this.consumerService.update(consumer));
    } else {
      this.subscribeToSaveResponse(this.consumerService.create(consumer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsumer>>): void {
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

  protected updateForm(consumer: IConsumer): void {
    this.consumer = consumer;
    this.consumerFormService.resetForm(this.editForm, consumer);
  }
}
