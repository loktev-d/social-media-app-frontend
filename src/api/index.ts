import axios, { AxiosResponse } from "axios";

import config from "../config/config.json";
import { GetAllPostsResponse } from "./dto";

export function getAllPosts(): Promise<AxiosResponse<GetAllPostsResponse>> {
  return axios.get<GetAllPostsResponse>(`${config.apiUrl}/posts`);
}
