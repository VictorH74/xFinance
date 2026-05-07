export type LocalizedCategoryName = {
  en: string;
  "pt-BR": string;
};

export type Category = {
  id: string;
  userId: string;
  name: string;
  localizedName?: LocalizedCategoryName | null;
  emoji: string;
  color: string;
  isDefault: boolean
  createdAt: Date;
  updatedAt: Date;
};
