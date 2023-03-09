export interface IConsumer {
  id: string;
  name?: string | null;
}

export type NewConsumer = Omit<IConsumer, 'id'> & { id: null };
