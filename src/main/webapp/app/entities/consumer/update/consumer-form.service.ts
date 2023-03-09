import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConsumer, NewConsumer } from '../consumer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConsumer for edit and NewConsumerFormGroupInput for create.
 */
type ConsumerFormGroupInput = IConsumer | PartialWithRequiredKeyOf<NewConsumer>;

type ConsumerFormDefaults = Pick<NewConsumer, 'id'>;

type ConsumerFormGroupContent = {
  id: FormControl<IConsumer['id'] | NewConsumer['id']>;
  name: FormControl<IConsumer['name']>;
};

export type ConsumerFormGroup = FormGroup<ConsumerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConsumerFormService {
  createConsumerFormGroup(consumer: ConsumerFormGroupInput = { id: null }): ConsumerFormGroup {
    const consumerRawValue = {
      ...this.getFormDefaults(),
      ...consumer,
    };
    return new FormGroup<ConsumerFormGroupContent>({
      id: new FormControl(
        { value: consumerRawValue.id, disabled: consumerRawValue.id !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(consumerRawValue.name),
    });
  }

  getConsumer(form: ConsumerFormGroup): IConsumer | NewConsumer {
    return form.getRawValue() as IConsumer | NewConsumer;
  }

  resetForm(form: ConsumerFormGroup, consumer: ConsumerFormGroupInput): void {
    const consumerRawValue = { ...this.getFormDefaults(), ...consumer };
    form.reset(
      {
        ...consumerRawValue,
        id: { value: consumerRawValue.id, disabled: consumerRawValue.id !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConsumerFormDefaults {
    return {
      id: null,
    };
  }
}
