import React, { useState } from "react";

export default function Salary({ salary }) {
  const [open, setOpen] = useState(false);

  const stats = [
    {
      id: 1,
      name: "Salary + Bonus",
      value: parseInt(salary?.currentSalary),
      value2: salary?.bonus,
    },
    {
      id: 2,
      name: "Total",
      value: parseInt(salary?.currentSalary) + parseInt(salary?.bonus || 0),
    },
    {
      id: 3,
      value: parseInt(salary?.currentSalary) - parseInt(salary?.incriment),
      value2: parseInt(salary?.incriment) || 0,
      name: `Last Incriment(${salary?.month || "-"})`,
    },
  ];
  return (
    <>
      {!salary ? (
        <>
          <h1>No salary data </h1>
        </>
      ) : (
        <>
          <div className=" w-full h-56 min-h-full mt-5  text-center">
            <div className="bg-white py-24 sm:py-32">
              <div className="mx-auto  px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="mx-auto flex  flex-col gap-y-4"
                    >
                      <dt className="text-base leading-7 text-gray-600">
                        {stat.name}
                      </dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        <p>{stat.value || 0}</p>

                        {stat.value2 && stat.value ? (
                          <p className="text-green-600">+{stat.value2}</p>
                        ) : (
                          ""
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
