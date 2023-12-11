import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class AuthService {
  static ApiEndpoint = {
    auth: "/auth",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.auth);
  }

  static getOne(user_id: number) {
    if (user_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.auth + `/${user_id}`);
  }

  static postMock(payload: any) {
    return apiClient.post(this.ApiEndpoint.auth, payload);
  }

  static putMock(payload: any, user_id: number) {
    if (user_id === undefined) return undefined;
    return apiClient.put(this.ApiEndpoint.auth + `/${user_id}`, payload);
  }

  static deleteMock(user_id: number) {
    if (user_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.auth + `/${user_id}`);
  }
}

export const useGetAllAuth = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllAuth"],
    fetchAction: async () => AuthService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneAuth = (user_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneAuth", user_id],
    fetchAction: async () => AuthService.getOne(user_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
