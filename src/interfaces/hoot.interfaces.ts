export type hootProps = {
  _id: string | any;
  author: {
    _id: string;
    username: string;
  };
  textContent: string | any;
  createdAt: number;
  hearts: Array<string> | any;
  favorite?: boolean;
  bookmarked?: boolean;
  onBookMark: (id: string) => void;
  onReaction: (id: string) => void;
};
