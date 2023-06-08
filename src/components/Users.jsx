import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./deleteModal";

export default function Users({ data, deleteUser }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState({});
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {data.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5 ">
            <div
              className="flex gap-x-4 cursor-pointer"
              onClick={() => navigate(`/${person._id}/employee`)}
            >
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {person.jobtitle}
              </p>

              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">
                  {person.department}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <button
                className="text-sm font-medium text-red-600 leading-6 hover:bg-red-100 bg-red-200 p-4 rounded-lg"
                onClick={() => {
                  setOpen(true);
                  setEmployee(person);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        data={employee}
        deleteUser={(id) => {
          deleteUser(id);
        }}
      />
    </div>
  );
}
