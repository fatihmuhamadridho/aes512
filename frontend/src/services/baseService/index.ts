import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export class MockService {
  static ApiEndpoint = {
    mock: "/mock",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.mock);
  }

  static getOne(mock_id: number) {
    if (mock_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.mock + `/${mock_id}`);
  }

  static postMock(payload: any) {
    return apiClient.post(this.ApiEndpoint.mock, payload);
  }

  static putMock(payload: any, mock_id: number) {
    if (mock_id === undefined) return undefined;
    return apiClient.put(this.ApiEndpoint.mock + `/${mock_id}`, payload);
  }

  static deleteMock(mock_id: number) {
    if (mock_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.mock + `/${mock_id}`);
  }
}

export const useGetAllMock = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllMock"],
    fetchAction: async () => MockService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneMock = (mock_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneMock", mock_id],
    fetchAction: async () => MockService.getOne(mock_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
