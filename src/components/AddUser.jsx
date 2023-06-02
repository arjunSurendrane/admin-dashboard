import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AddUser({
  open,
  setOpen,
  title,
  submitData,
  fields,
  loading,
}) {
  const cancelButtonRef = useRef(null);
  const [error, setError] = useState("");
  const dataCollection = {};

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      dataCollection["confirmPassword"] !=
                      dataCollection["password"]
                    )
                      return setError("Password mismatch");
                    console.log(dataCollection);
                    setError("");
                    submitData(dataCollection);
                  }}
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                        <div className="mt-2">
                          {fields.map((data) => (
                            <div className="mt-2" key={data.placeholder}>
                              <input
                                id="salary"
                                name={data.placeholder}
                                type={data.type}
                                onChange={(e) =>
                                  (dataCollection[data.placeholder] =
                                    e.target.value)
                                }
                                autoComplete="salary"
                                value={dataCollection[data.placeholder]}
                                placeholder={data.placeholder}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-[#1D3557] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#24426d] sm:ml-3 sm:w-auto"
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
