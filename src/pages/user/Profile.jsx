import useSWR from "swr";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import OverallRating from "../../components/OverallRating";
import Salary from "../../components/Salary";
import Tasks from "../../components/Tasks";
import UserData from "../../components/UserData";
import { sendRequest } from "../../api";
import Modal from "../../components/Modal";

export default function Profile() {
  const token =
    localStorage.getItem("hrJwt") || localStorage.getItem("adminJwt");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setError] = useState("");
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(false);
  const { empid: id } = useParams();
  const {
    isLoading,
    error,
    data: response,
    mutate,
  } = useSWR(
    { link: "employeeDetails", id, token, method: "get" },
    sendRequest
  );

  const addRating = async (id, rating) => {
    try {
      console.log(id, rating);
      const res = await sendRequest({
        link: "addRating",
        method: "patch",
        id,
        token,
        data: { rating },
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const submitData = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (title == "Incriment salary") {
        const res = await sendRequest({
          link: "incrimentSalary",
          method: "patch",
          data: { incriment: data },
          id,
          token,
        });
        setOpen(false);
        mutate();
      } else if (title == "Incriment Bonus") {
        const res = await sendRequest({
          link: "incrimentBonus",
          method: "patch",
          data: { bonus: data },
          id,
          token,
        });
        setOpen(false);
        mutate();
      } else {
        console.log(data);
        const res = await sendRequest({
          link: "addTask",
          method: "post",
          data: { taskName: data },
          id,
          token,
        });
        mutate();
        setOpen(false);
      }
    } catch (error) {
      console.log("error" + error);
      setError("Something gone wrong");
    }
    setLoading(false);
  };

  if (isLoading) {
    console.log("loading...");
  } else if (error) {
    console.log("error");
  } else {
    console.log("success");
    const userData = response?.data?.data;
    const { employee, salary, tasks } = userData;
    console.log({ task: tasks[0] });
    let overallRating = (
      (tasks[0]?.sumOfRating / (tasks[0]?.count * 5)) *
      5
    ).toFixed(1);
    if (!overallRating) overallRating = 0.0;
    return (
      <div className="p-10 ">
        <div className="flex justify-between p-10">
          <div className=" w-[60%]">
            <UserData data={employee} />
          </div>
          <div className=" grid place-content-center ">
            <OverallRating rating={overallRating} />
          </div>
        </div>
        <div className="p-10">
          <Salary salary={salary} />
          {role != "Employee" ? (
            <div className="flex justify-center">
              <div className="m-5">
                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-[#203b61] px-8 py-3 text-center font-medium text-white hover:bg-[#192e4b]"
                  onClick={() => {
                    setTitle("Incriment salary");
                    setOpen(true);
                  }}
                >
                  Incriment Salary
                </a>
              </div>
              <div className="m-5">
                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-[#203b61] px-8 py-3 text-center font-medium text-white hover:bg-[#192e4b]"
                  onClick={() => {
                    setTitle("Incriment Bonus");
                    setOpen(true);
                  }}
                >
                  Incriment Bonus
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mt-16 p-10">
          {role != "Employee" ? (
            <div>
              <a
                href="#"
                onClick={() => {
                  setTitle("Write Task Name");
                  setOpen(true);
                }}
                className="inline-block rounded-md border border-transparent bg-[#203b61] px-8 py-3 text-center font-medium text-white hover:bg-[#192e4b]"
              >
                Add Task
              </a>
            </div>
          ) : (
            ""
          )}

          <Tasks
            data={tasks}
            addRating={(id, rating) => addRating(id, rating)}
          />
        </div>
        <Modal
          open={open}
          loading={loading}
          setOpen={(data) => setOpen(data)}
          title={title}
          submitData={(data) => submitData(data)}
        />
      </div>
    );
  }
}
