export type GetAllPostsResponse = PostModel[];

export interface PostModel {
  _id: string;
  title: string;
  body: string;
  picture: string;
  created: Date;
  createdBy: string;
}

export interface CreatePostDto {
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio: string;
}

export type GetAllUsersResponse = UserModel[];

export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}
