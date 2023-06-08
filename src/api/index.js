import axios from "./axios";

const urls = {
  employeeLogin: "/auth/employee/login",
  employeeDetails: "/employee/:id",
  incrimentSalary: "/salary/:id/incriment",
  incrimentBonus: "/salary/:id/bonus",
  addTask: "/task/:id",
  hrLogin: "/auth/hr/login",
  adminLogin: "/auth/admin/login",
  listAllEmployees: "/employee",
  createEmployee: "/auth/employee/signup",
  addRating: "/task/:id/rating",
  deleteEmployee: "/employee/:id",
};

export const sendRequest = async ({
  link,
  id = null,
  data = null,
  token = null,
  method,
}) => {
  let url = urls[link];
  if (id) url = url.replace(":id", id);
  if (method == "get") {
    const res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (method == "post") {
    const res = await axios.post(url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (method == "patch") {
    const res = await axios.patch(url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (method == "delete") {
    const res = await axios.delete(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
};
