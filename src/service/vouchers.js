import axiosInstance from "./index";

// get all vouchers with pagination
export function getVouchers(page, limit) {
  return axiosInstance.get(`/vouchers?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// get voucher by id
export function getVoucherById(id) {
  return axiosInstance.get(`/vouchers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// create new voucher
export function createVoucher({ discount, upTo, ...rest }) {
  return axiosInstance.post(
    "/vouchers",
    { upTo: Number(upTo), discount: Number(discount), ...rest },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

// update voucher
export function updateVoucher(id, { discount, upTo, ...rest }) {
  return axiosInstance.put(
    `/vouchers/${id}`,
    { upTo: Number(upTo), discount: Number(discount), ...rest },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

// delete voucher
export function deleteVoucher(id) {
  return axiosInstance.delete(`/vouchers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
