import { ISubscriptionn, NewSubscriptionn } from './subscriptionn.model';

export const sampleWithRequiredData: ISubscriptionn = {
  id: '8800ca9d-8349-47ab-82a5-1632504b9302',
};

export const sampleWithPartialData: ISubscriptionn = {
  id: '1e49911c-2e49-4062-b019-7e72649a0674',
};

export const sampleWithFullData: ISubscriptionn = {
  id: '964027e6-db83-4a6c-87a9-e19403d4287d',
};

export const sampleWithNewData: NewSubscriptionn = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
