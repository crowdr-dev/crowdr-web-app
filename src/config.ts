export const isProd =
  window.location.hostname === "panenkafc.gg" ||
  window.localStorage.getItem("isProd");

const API_BASE_URL = isProd
  ? "https://prod-api.oncrowdr.com"
  : "https://test-api.oncrowdr.com";

// if you should ever change the jwt expiration time in the backedn also remember to change this
// this value should always be sligtly less than the jwt expiration time on the server
const COOKIE_EXPIRATION = 6.5 * 24 * 60 * 60; // 6 & half days in seconds

const COOKIE_CONFIG = {
  maxAge: COOKIE_EXPIRATION,
  path: "/", // Set the path to '/' to make it available for the entire domain
  secure: true,
  httpOnly: true,
};
export { API_BASE_URL, COOKIE_CONFIG };
