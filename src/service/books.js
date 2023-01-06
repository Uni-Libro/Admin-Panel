import axiosInstance from "./index";

// get all books with pagination
export function getBooks() {
  return axiosInstance.get(`/books`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// get book by id
export function getBookById(id) {
  return axiosInstance.get(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// create new book
export function createBook(book) {
  return axiosInstance.post("/books", book, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// update book
export function updateBook(id, book) {
  return axiosInstance.put(`/books/${id}`, book, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// delete book
export function deleteBook(id) {
  return axiosInstance.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
