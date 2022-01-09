import axios, { AxiosResponse } from "axios";

import config from "../config/config.json";
import { GetAllUsersResponse, UserModel } from "./dto";

export function getAllUsers(): Promise<AxiosResponse<GetAllUsersResponse>> {
  return axios.get<GetAllUsersResponse>(`${config.apiUrl}/users`);
}

export function getUser(id: string): Promise<AxiosResponse<UserModel>> {
  return axios.get<UserModel>(`${config.apiUrl}/users/${id}`);
}
