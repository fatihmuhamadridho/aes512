import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export interface FileServicePostFileProps {
  file: File | null;
  password: string;
  description: string;
}

export class FileService {
  static ApiEndpoint = {
    file: "/file",
    decrypt: "/file/decrypt",
    resetDecrypt: "file/reset-decrypt",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.file);
  }

  static getOne(file_id: number) {
    if (file_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.file + `/${file_id}`);
  }

  static postFile(payload: FileServicePostFileProps) {
    const formData = new FormData();
    if (payload.file !== null) {
      formData.append("file", payload.file);
    }
    formData.append("password", payload.password);
    formData.append("description", payload.description);
    return apiClient.post(this.ApiEndpoint.file, formData);
  }

  static deleteFile(file_id: number) {
    if (file_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.file + `/${file_id}`);
  }

  static decryptFile({
    file_id,
    password,
  }: {
    file_id: number;
    password: string;
  }) {
    if (file_id === undefined) return undefined;
    return apiClient.post(this.ApiEndpoint.decrypt + `/${file_id}`, {
      password,
    });
  }

  static async downloadFlie(destination: string, filename: string) {
    return apiClient
      .get(destination, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        if (response.status === 200) {
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();

          // Clean up
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
          return response;
        } else {
          throw Error("Failed download file!");
        }
      })
      .catch((error: any) => {
        throw Error("Failed download file!", error);
      });
  }

  static resetDecryptFile(file_id: number) {
    if (file_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.resetDecrypt + `/${file_id}`);
  }
}

export const useGetAllFile = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllFile"],
    fetchAction: async () => FileService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneFile = (file_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneFile", file_id],
    fetchAction: async () => FileService.getOne(file_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
