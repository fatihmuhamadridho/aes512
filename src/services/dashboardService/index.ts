import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/aes512",
});

export class DashboardService {
  static ApiEndpoint = {
    dashboard: "/dashboard",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.dashboard);
  }
}

export const useGetAllDashboard = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllDashboard"],
    fetchAction: async () => DashboardService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
