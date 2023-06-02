import { useState } from "react";
import { logo } from "../contents";

export default function Form({
  title,
  firstField,
  secondField,
  button,
  setFirstField,
  setSecondField,
  error,
  submitData,
  loading,
}) {
  const [user, setUser] = useState("");
  return (
    <>
      {" "}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {title}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              submitData(user);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {firstField}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setFirstField(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {secondField}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setSecondField(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1D3557] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#274774] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : button}
              </button>
            </div>
          </form>
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>

          {title == "Admin Login" ? (
            ""
          ) : (
            <>
              <p className="mt-10 text-center text-sm text-gray-500">
                Login as {user == "HR" ? "Employee" : "HR"}?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() =>
                    setUser((user) => (user == "HR" ? "Employee" : "HR"))
                  }
                >
                  click here
                </a>
              </p>
              <p className="mt-10 text-center text-sm text-gray-500">
                Admins{" "}
                <a
                  href="/d/admin"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() =>
                    setUser((user) => (user == "HR" ? "Employee" : "HR"))
                  }
                >
                  Login Here
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
