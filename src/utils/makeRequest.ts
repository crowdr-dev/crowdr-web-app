import { API_BASE_URL } from "@/config";
import { extractErrorMessage } from "./extractErrorMessage";

export default async function makeRequest<T>(
  endpoint: string,
  options: {
    method?: string;
    payload?: Record<string, any> | null;
    headers?: Record<string, string> | null;
    cache?: RequestCache;
  } = {}
): Promise<T> {
  const {
    method = "GET",
    payload = null,
    headers,
    cache = "default",
  } = options;

  const requestOptions: RequestInit = {
    method,
    headers: headers
      ? { "Content-Type": "application/json", ...headers }
      : {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    cache,
  };

  if (payload !== null) {
    requestOptions.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(API_BASE_URL + endpoint, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        response.status >= 400 && response.status < 500
          ? data.message || "Request failed"
          : "Unknown server error"
      );
    }

    return data as T;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
