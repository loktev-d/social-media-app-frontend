export type GetAllPostsResponse = PostModel[];

export interface PostModel {
  _id: string;
  title: string;
  body: string;
  picture: string;
  created: Date;
  createdBy: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}
