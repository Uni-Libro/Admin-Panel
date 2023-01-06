import axiosInstance from "./index";

// get all users with pagination
export function getUsers(page, limit) {
  return axiosInstance.get(`/users?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// get user by id
export function getUserById(id) {
  return axiosInstance.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// create new user
export function createUser(user) {
  return axiosInstance.post("/users", user, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// update user
export function updateUser(id, user) {
  return axiosInstance.put(`/users/${id}`, user, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// delete user
export function deleteUser(id) {
  return axiosInstance.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
