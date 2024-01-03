import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export interface UserServicePostUserProps {
  fullname: string;
  username: string;
  password: string;
}

export class UserService {
  static ApiEndpoint = {
    user: "/user",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.user);
  }

  static getOne(user_id: number) {
    if (user_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.user + `/${user_id}`);
  }

  static postUser(payload: UserServicePostUserProps) {
    return apiClient.post(this.ApiEndpoint.user, payload);
  }

  static putUser(payload: UserServicePostUserProps, user_id: number) {
    if (user_id === undefined) return undefined;
    return apiClient.put(this.ApiEndpoint.user + `/${user_id}`, payload);
  }

  static deleteUser(user_id: number) {
    if (user_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.user + `/${user_id}`);
  }
}

export const useGetAllUser = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllUser"],
    fetchAction: async () => UserService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneUser = (user_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneUser", user_id],
    fetchAction: async () => UserService.getOne(user_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
