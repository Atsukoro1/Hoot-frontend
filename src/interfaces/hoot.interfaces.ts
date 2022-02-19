export type hootProps = {
  _id: string | any;
  author: {
    _id: string;
    username: string;
  };
  textContent: string | any;
  createdAt: number;
  hashtags: string[] | any;
  hearts: string[] | any;
  favorite?: boolean;
  bookmarked?: boolean;
  onBookMark: (id: string) => void;
  onReaction: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, textContent: string) => void;
};
