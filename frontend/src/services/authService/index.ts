import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/aes512/auth",
});

export interface AuthServiceLoginProps {
  username: string;
  password: string;
}

export interface AuthServiceChangePasswordProps {
  username: string;
  password: string;
  new_password: string;
}

export class AuthService {
  static ApiEndpoint = {
    privilege: "/privilege",
    login: "/login",
    changePassword: "change-password",
  };

  static privilege() {
    return apiClient.get(this.ApiEndpoint.privilege);
  }

  static login(payload: AuthServiceLoginProps) {
    return apiClient.post(this.ApiEndpoint.login, payload);
  }

  static changePassword(payload: AuthServiceChangePasswordProps) {
    return apiClient.post(this.ApiEndpoint.changePassword, payload);
  }
}
