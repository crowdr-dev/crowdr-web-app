/**
 * Sets a client-side cookie with proper encoding and security attributes
 * @param name - The name of the cookie to set
 * @param value - The value to store in the cookie
 * @param days - Number of days until the cookie expires (optional)
 */
export function setClientSideCookie(
  name: string,
  value: string,
  days?: number
): void {
  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  // Set SameSite and Secure attributes for better compatibility
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    expires +
    "; path=/; SameSite=Strict" +
    (window.location.protocol === "https:" ? "; Secure" : "");
}

/**
 * Cookie options interface for more complex cookie configurations
 */
interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  sameSite?: "Strict" | "Lax" | "None";
  secure?: boolean;
  httpOnly?: boolean;
}

/**
 * Sets a client-side cookie with advanced options
 * @param name - The name of the cookie to set
 * @param value - The value to store in the cookie
 * @param options - Advanced cookie configuration options
 */
export function setAdvancedClientCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    days,
    path = "/",
    domain,
    sameSite = "Strict",
    secure = window.location.protocol === "https:",
    httpOnly = false
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  cookieString += `; SameSite=${sameSite}`;

  if (secure) {
    cookieString += "; Secure";
  }

  if (httpOnly) {
    cookieString += "; HttpOnly";
  }

  document.cookie = cookieString;
}

/**
 * Gets a client-side cookie by name
 * @param name - The name of the cookie to retrieve
 * @returns The decoded cookie value or null if not found
 */
export function getClientCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Deletes a client-side cookie by name
 * @param name - The name of the cookie to delete
 */
export function deleteClientCookie(name: string): void {
  document.cookie = name + "=; Max-Age=-99999999; path=/";
}
