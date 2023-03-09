import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISubscriptionn, NewSubscriptionn } from '../subscriptionn.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISubscriptionn for edit and NewSubscriptionnFormGroupInput for create.
 */
type SubscriptionnFormGroupInput = ISubscriptionn | PartialWithRequiredKeyOf<NewSubscriptionn>;

type SubscriptionnFormDefaults = Pick<NewSubscriptionn, 'id'>;

type SubscriptionnFormGroupContent = {
  id: FormControl<ISubscriptionn['id'] | NewSubscriptionn['id']>;
  id: FormControl<ISubscriptionn['id']>;
  id: FormControl<ISubscriptionn['id']>;
};

export type SubscriptionnFormGroup = FormGroup<SubscriptionnFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SubscriptionnFormService {
  createSubscriptionnFormGroup(subscriptionn: SubscriptionnFormGroupInput = { id: null }): SubscriptionnFormGroup {
    const subscriptionnRawValue = {
      ...this.getFormDefaults(),
      ...subscriptionn,
    };
    return new FormGroup<SubscriptionnFormGroupContent>({
      id: new FormControl(
        { value: subscriptionnRawValue.id, disabled: subscriptionnRawValue.id !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      id: new FormControl(subscriptionnRawValue.id),
      id: new FormControl(subscriptionnRawValue.id),
    });
  }

  getSubscriptionn(form: SubscriptionnFormGroup): ISubscriptionn | NewSubscriptionn {
    return form.getRawValue() as ISubscriptionn | NewSubscriptionn;
  }

  resetForm(form: SubscriptionnFormGroup, subscriptionn: SubscriptionnFormGroupInput): void {
    const subscriptionnRawValue = { ...this.getFormDefaults(), ...subscriptionn };
    form.reset(
      {
        ...subscriptionnRawValue,
        id: { value: subscriptionnRawValue.id, disabled: subscriptionnRawValue.id !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SubscriptionnFormDefaults {
    return {
      id: null,
    };
  }
}
