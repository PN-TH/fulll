import { IGetUsersResponse } from "../interfaces/users";
import { apiService } from "./apiService/apiService";

export const fetchUsers = async (query: string): Promise<IGetUsersResponse | null> => {
    if (query) return apiService(`/search/users?q=${query}`);
    else return null;
};
