import axios, { AxiosInstance } from "axios";

import { clientEnv } from "@/env/client.environment";

const ApiClient = () => {
  const instance = axios.create({
    baseURL: clientEnv.API_BASE_URL + '/api',
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(`[interceptor][error]`, error);
      return Promise.reject(error);
    }
  );

  return instance;
};

const setClientToken = ({
  token,
  instance,
}: {
  token: string;
  instance: AxiosInstance;
}) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

const axiosClient = ApiClient();

export { axiosClient, setClientToken };
