import { API_BASE_URL } from "@/config"
import { extractErrorMessage } from "./extractErrorMessage"
import { RequestOptions } from "https"

export default async function makeRequest<T = any>(
  endpoint: string,
  options: {
    method?: FetchMethod
    payload?: Record<string, any> | null | any
    headers?: Record<string, string | number> | null
    cache?: RequestCache
    tags?: string[]
    extractError?: boolean
  } = {}
): Promise<IResponse<T>> {
  const {
    method = "GET",
    payload = null,
    headers,
    cache = "default",
    tags,
    extractError,
  } = options

  const defaultHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  const requestOptions: RequestOptions & RequestInit = {
    method,
    headers: headers ? { ...defaultHeader, ...headers } : defaultHeader,
    cache,
    next: { tags },
  }

  // allow fetch to automatically set ["Content-Type"] === "multipart/form-data", so it can add boundary
  if (
    requestOptions.headers &&
    requestOptions.headers["Content-Type"] === "multipart/form-data"
  ) {
    delete requestOptions.headers["Content-Type"]
  }

  if (payload !== null) {
    requestOptions.body = payload
  }

  try {
    const response = await fetch(API_BASE_URL + endpoint, requestOptions)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        response.status >= 400 && response.status < 500
          ? data.message || "Request failed"
          : data.message || "Unknown server error"
      )
    }

    return data
  } catch (error) {
    if (extractError === false) {
      throw error
    } else {
      throw new Error(extractErrorMessage(error))
    }
  }
}

interface IResponse<T = any> {
  data: T
  success?: boolean
  message?: string
}

type FetchMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "CONNECT"
  | "TRACE"
