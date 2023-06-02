import React from "react";
import { useNavigate } from "react-router-dom";

export default function Users({ data }) {
  const navigate = useNavigate();
  console.log({ data });
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {data.map((person) => (
          <li
            key={person.email}
            className="flex justify-between gap-x-6 py-5 cursor-pointer"
            onClick={() => navigate(`/${person._id}/employee`)}
          >
            <div className="flex gap-x-4">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
