import axios from "axios";

import SERVICES from "./api";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

const API = {};

for (const [keys, values] of Object.entries(SERVICES)) {
  API[keys] = (
    { data, headers, query, params },
    uploadProgress,
    downloadProgress
  ) => {
    return axiosInstance({
      ...(params ? { url: `${values.uri + params}` } : { url: values.uri }),
      method: values.method,
      ...(query ? { params: query } : {}),
      headers: {
        ...(headers && {
          headers,
        }),
      },
      ...(data && { data: data }),
      onUploadProgress: (progressEvent) => {
        if (uploadProgress) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          uploadProgress(percentage);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (downloadProgress) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          downloadProgress(percentage);
        }
      },
    });
  };
}

export { API };
