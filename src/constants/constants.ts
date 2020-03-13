export const USERNOTFOUND = "User not found";
export const ORGANIZATIONNOTFOUND = "Organization not found";
export const USERNOTVERIFIED = "User's email is not verified";
export const CACHESTOREERROR = "Error while storing data in cache";
export const TOOMANYREQUESTS = "Too many requests";
export const X_USERNAME_HEADER = "x-user-name";
export const USERALREADYEXIST = "User already exists";
export const NOPUBLICRTMPFOUND = "Public rtmp url not found";
export const STREAMCONFLICT = "Stream already in queue";
export const INTERNALSERVERERROR = "Something went wrong!";
export const INVALID_QUERY_SIGNATURE = "Invalid query signature";
export const Base64 = "base64";

export enum AccountState {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  EMAILFAILED = "emailfailed"
}

export enum ImageSize {
  L = "large",
  S = "small",
  M = "medium"
}

export enum ImageWidth {
  L = 640,
  M = 480,
  S = 240
}

export enum ImageType {
  WEBP = "webp",
  PNG = "png"
}

export enum UserType {
  ADMIN = "admin",
  SUPERADMIN = "super_user",
  CURATOR = "curator"
}
