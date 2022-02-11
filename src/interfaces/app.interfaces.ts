export interface IUser {
  _id: string;
  hoots?: Array<string>;
  createdAt?: Date;
  bio?: string;
  ua?: string;
  email?: string;
  username: string;
}

export interface IHoot {
  _id: string;
  replies?: Array<string>;
  hashtags?: Array<string>;
  hearts?: Array<string>;
  textContent?: string;
  author: IUser;
  createdAt: number;
}

export interface IUserResponse {
  data?: {
    success: boolean;
    data?: IUser | undefined;
    errors?: string | undefined;
  };
}

interface IPaginatedHootResponse {
  docs: Array<IHoot>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export interface IHootResponse {
  data?: {
    success: boolean;
    data?: IPaginatedHootResponse | any;
    errors?: string | undefined;
  };
}
