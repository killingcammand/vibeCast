import { jwtDecode } from "jwt-decode";

export const getUserIDUtil = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};