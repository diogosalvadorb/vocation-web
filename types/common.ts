export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CommonPhrase {
  id: string;
  text: string;
  textTranslated: string;
  soundUrl: string;
  createdAt: Date;
  userId: string;
  categories: {
    category: Category;
  }[];
}