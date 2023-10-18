import { API_BASE_URL } from "@/config";
import { extractErrorMessage } from "./extractErrorMessage";
import { RequestOptions } from "https";

export default async function makeRequest<T>(
  endpoint: string,
  options: {
    method?: string;
    payload?: Record<string, any> | null | any;
    headers?: Record<string, string | number> | null;
    cache?: RequestCache;
    tags?: string[];
  } = {}
): Promise<T> {
  const {
    method = "GET",
    payload = null,
    headers,
    cache = "default",
    tags,
  } = options;

  const defaultHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const requestOptions: RequestOptions & RequestInit = {
    method,
    headers: headers ? { ...defaultHeader, ...headers } : defaultHeader,
    cache,
    next: { tags },
  };

  // allow fetch ao automatically set "Content-Type"] === "multipart/form-data", so it can add boundary
  if(requestOptions.headers && requestOptions.headers["Content-Type"] === "multipart/form-data"){
    delete requestOptions.headers["Content-Type"]
  }

  if (payload !== null) {
    requestOptions.body = payload;
  }

  try {
    const response = await fetch(API_BASE_URL + endpoint, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        response.status >= 400 && response.status < 500
          ? data.message || "Request failed"
          : data.message || "Unknown server error"
      );
    }

    return data as T;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
