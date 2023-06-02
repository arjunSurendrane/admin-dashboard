import { useState } from "react";
import { Rating } from "@material-tailwind/react";

export default function Tasks({ data, addRating }) {
  const role = localStorage.getItem("role");
  return (
    <>
      {!data.length ? (
        <>
          <h1>No Tassk Data</h1>
        </>
      ) : (
        <>
          <ul role="list" className="divide-y divide-gray-100 mt-5">
            {data[0]?.data?.map((task) => (
              <li
                key={task?._id}
                className="flex justify-between gap-x-6 py-5 cursor-pointer"
              >
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    {" "}
                    <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
                      {task?.taskName}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-yellow-500">
                    <>
                      {role != "Employee" ? (
                        <Rating
                          value={task?.rating || 0}
                          onChange={(e) => addRating(task._id, e)}
                        />
                      ) : (
                        <Rating value={task?.rating || 0} readonly />
                      )}
                    </>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
