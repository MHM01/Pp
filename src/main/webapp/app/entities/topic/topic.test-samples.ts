import { ITopic, NewTopic } from './topic.model';

export const sampleWithRequiredData: ITopic = {
  id: '8b082cab-13d2-49ca-8b2d-e24ed5eb84ac',
};

export const sampleWithPartialData: ITopic = {
  id: '9723f7a8-e120-4912-828d-ef2c5652dc1e',
};

export const sampleWithFullData: ITopic = {
  id: '1b3b7fcc-9d36-4956-b00e-2d62218b2e29',
  name: 'utilisation violet invoice',
};

export const sampleWithNewData: NewTopic = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
