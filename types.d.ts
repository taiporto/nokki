export type Collection = {
  id: number;
  name: string;
  description: string | null;
};

export type InsertCollection = Pick<Collection, "name" | "description">;

export type Card = {
  id: number;
  title: string;
  content: string | null;
  isFavorite: boolean | null;
  collectionId: number;
};
