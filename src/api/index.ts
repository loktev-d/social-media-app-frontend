import axios, { AxiosResponse } from "axios";

import config from "../config/config.json";
import {
  GetAllPostsResponse,
  GetAllUsersResponse,
  UserModel,
  CreatePostDto,
  PostModel,
} from "./dto";

export function getAllPosts(): Promise<AxiosResponse<GetAllPostsResponse>> {
  return axios.get<GetAllPostsResponse>(`${config.apiUrl}/posts`);
}

export function getAllUsers(): Promise<AxiosResponse<GetAllUsersResponse>> {
  return axios.get<GetAllUsersResponse>(`${config.apiUrl}/users`);
}

export function getUser(id: string): Promise<AxiosResponse<UserModel>> {
  return axios.get<UserModel>(`${config.apiUrl}/users/${id}`);
}

export function createPost(
  post: CreatePostDto
): Promise<AxiosResponse<PostModel>> {
  return axios.post<PostModel>(`${config.apiUrl}/posts`);
}
