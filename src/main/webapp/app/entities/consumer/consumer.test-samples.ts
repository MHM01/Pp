import { IConsumer, NewConsumer } from './consumer.model';

export const sampleWithRequiredData: IConsumer = {
  id: '135111b6-328a-48df-81c3-4416c7f7c4a0',
};

export const sampleWithPartialData: IConsumer = {
  id: 'b1ba42f0-ebf1-49f7-ba96-6d3ee1673b33',
};

export const sampleWithFullData: IConsumer = {
  id: '6794c995-6a0e-4eb7-8744-7b37baeeef9e',
  name: 'Cotton',
};

export const sampleWithNewData: NewConsumer = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
