import { ITopic } from 'app/entities/topic/topic.model';
import { IConsumer } from 'app/entities/consumer/consumer.model';

export interface ISubscriptionn {
  id: string;
  id?: Pick<ITopic, 'id'> | null;
  id?: Pick<IConsumer, 'id'> | null;
}

export type NewSubscriptionn = Omit<ISubscriptionn, 'id'> & { id: null };
