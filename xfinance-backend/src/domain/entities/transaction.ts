export type Transaction = {
  id: number;
  price: number;
  categoryId: number;
  type: string;
  note?: string;
  userId: string;
  date: string;
};
