import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../subscriptionn.test-samples';

import { SubscriptionnFormService } from './subscriptionn-form.service';

describe('Subscriptionn Form Service', () => {
  let service: SubscriptionnFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionnFormService);
  });

  describe('Service methods', () => {
    describe('createSubscriptionnFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSubscriptionnFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            id: expect.any(Object),
            id: expect.any(Object),
          })
        );
      });

      it('passing ISubscriptionn should create a new form with FormGroup', () => {
        const formGroup = service.createSubscriptionnFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            id: expect.any(Object),
            id: expect.any(Object),
          })
        );
      });
    });

    describe('getSubscriptionn', () => {
      it('should return NewSubscriptionn for default Subscriptionn initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSubscriptionnFormGroup(sampleWithNewData);

        const subscriptionn = service.getSubscriptionn(formGroup) as any;

        expect(subscriptionn).toMatchObject(sampleWithNewData);
      });

      it('should return NewSubscriptionn for empty Subscriptionn initial value', () => {
        const formGroup = service.createSubscriptionnFormGroup();

        const subscriptionn = service.getSubscriptionn(formGroup) as any;

        expect(subscriptionn).toMatchObject({});
      });

      it('should return ISubscriptionn', () => {
        const formGroup = service.createSubscriptionnFormGroup(sampleWithRequiredData);

        const subscriptionn = service.getSubscriptionn(formGroup) as any;

        expect(subscriptionn).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISubscriptionn should not enable id FormControl', () => {
        const formGroup = service.createSubscriptionnFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSubscriptionn should disable id FormControl', () => {
        const formGroup = service.createSubscriptionnFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
