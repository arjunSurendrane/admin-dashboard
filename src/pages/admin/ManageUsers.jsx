import React, { useState } from "react";
import Users from "../../components/Users";
import useSWR from "swr";
import { sendRequest } from "../../api";
import Header from "../../components/Header";
import AddUser from "../../components/AddUser";

export default function ManageUsers() {
  const token = localStorage.getItem("adminJwt");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    isLoading,
    error,
    data: user,
    mutate,
  } = useSWR({ method: "get", token, link: "listAllEmployees" }, sendRequest);

  const submitData = async (data, deleteUser = false) => {
    setLoading(true);
    try {
      if (!deleteUser) {
        const res = await sendRequest({
          link: "createEmployee",
          token,
          method: "post",
          data,
        });
        mutate();
        setOpen(false);
      } else {
        const res = await sendRequest({
          link: "deleteEmployee",
          token,
          id: data,
          method: "delete",
        });
        mutate();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (isLoading) {
    console.log("loading...");
  } else if (error) {
    console.log("error");
  } else {
    const employees = user?.data?.data?.employees;
    return (
      <>
        <div className="p-10">
          <div className="p-16">
            <div>
              <h1 className="text-lg font-bold">Employees</h1>
              <hr />
            </div>
            <div className="mt-5">
              <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-[#203b61] px-8 py-3 text-center font-medium text-white hover:bg-[#192e4b]"
                onClick={() => {
                  setTitle("Add User");
                  setOpen(true);
                }}
              >
                Add Employees
              </a>
            </div>
            <div className="mt-5">
              <Users
                data={employees}
                deleteUser={(data) => submitData(data, true)}
              />
            </div>
          </div>
        </div>
        <AddUser
          open={open}
          title={title}
          loading={loading}
          setOpen={() => setOpen(false)}
          fields={[
            { placeholder: "name", type: "text" },
            { placeholder: "email", type: "email" },
            { placeholder: "jobtitle", type: "text" },
            { placeholder: "department", type: "text" },
            { placeholder: "salary", type: "Number" },
            { placeholder: "password", type: "password" },
            { placeholder: "confirmPassword", type: "passsword" },
          ]}
          submitData={(data) => submitData(data)}
        />
      </>
    );
  }
}
