import { get, post } from "~/utils/request";

export const allUserService = () => get("/auth/all");
export const authService = () => get("/auth/auth");
export const googleLoginService = (data) => post("/auth/google-login", data);
export const loginService = (data) => post("/auth/login", data);
export const registerService = (data) => post("/auth/register", data);
export const logoutService = () => get("/auth/logout");
export const updateUserService = (data) => post("/auth/update", data);

export const getUserByIdService = (data) => post("/auth/get", data);
export const updateUserAdminService = (data) =>
  post("/auth/update-admin", data);
export const deleteUserService = (data) => post("/auth/delete", data);
