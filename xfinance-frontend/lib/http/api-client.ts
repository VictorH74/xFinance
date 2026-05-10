import axios from "axios";

export const api = axios.create({
  baseURL: '/api/proxy',
  timeout: 10000,
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();

      Object.entries(params ?? {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null) {
              searchParams.append(key, String(item));
            }
          });
          return;
        }

        searchParams.append(key, String(value));
      });

      return searchParams.toString();
    },
  },
  // withCredentials: true
});
