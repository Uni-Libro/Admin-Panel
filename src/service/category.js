import axiosInstance from "./index";

// get all categories with pagination
export function getCategories(page, limit) {
  return axiosInstance.get(`/categories?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// get category by id
export function getCategoryById(id) {
  return axiosInstance.get(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// create new category
export function createCategory(category) {
  return axiosInstance.post("/categories", category, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// update category
export function updateCategory(id, category) {
  return axiosInstance.put(`/categories/${id}`, category, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// delete category
export function deleteCategory(id) {
  return axiosInstance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
