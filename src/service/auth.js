import axiosInstance from "./index";

export function login({ username, password }) {
  return axiosInstance.post(
    "/admin/login",
    {
      username,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export function logout() {
  return axiosInstance.post("/admin/logout", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function signup({ username, password }) {
  return axiosInstance.post(
    "/admin/signup",
    {
      username,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

// validate token
export function validateToken() {
  return axiosInstance.post(
    "/validate",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}
