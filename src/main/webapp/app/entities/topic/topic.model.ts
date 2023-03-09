export interface ITopic {
  id: string;
  name?: string | null;
}

export type NewTopic = Omit<ITopic, 'id'> & { id: null };
