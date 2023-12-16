const API_BASE_URL = "https://ec2-16-171-166-200.eu-north-1.compute.amazonaws.com";

// if you should ever change the jwt expiration time in the backedn also remember to change this 
// this value should always be sligtly less than the jwt expiration time on the server
const COOKIE_EXPIRATION = 6.5 * 24 * 60 * 60; // 6 & half days in seconds

const COOKIE_CONFIG = {
  maxAge: COOKIE_EXPIRATION,
  path: "/", // Set the path to '/' to make it available for the entire domain
  secure: true,
  httpOnly: true
};
export { API_BASE_URL, COOKIE_CONFIG };
