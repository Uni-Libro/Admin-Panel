import axiosInstance from "./index";

// get all authors with pagination
export function getAuthors(page, limit) {
  return axiosInstance.get(`/authors?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// get author by id
export function getAuthorById(id) {
  return axiosInstance.get(`/authors/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// create new author
export function createAuthor(author) {
  return axiosInstance.post("/authors", author, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// update author
export function updateAuthor(id, author) {
  return axiosInstance.put(`/authors/${id}`, author, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// delete author
export function deleteAuthor(id) {
  return axiosInstance.delete(`/authors/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
