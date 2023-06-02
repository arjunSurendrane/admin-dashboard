import { useNavigate } from "react-router-dom";
import { logo } from "../contents";
import { useEffect } from "react";

export default function Header({ menuItem }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  return (
    <>
      {" "}
      {role && (
        <>
          <div className="w-full h-16  pb-11 px-11 flex justify-between shadow-md">
            <div className=" w-20 h-full cursor-pointer">
              <img src={logo} alt="logo" className="h-10" />
            </div>
            <div>
              <ul className="flex justify-between">
                {menuItem?.map((item) => (
                  <li
                    className="font-bold text-lg cursor-pointer m-4"
                    onClick={() => navigate(item?.link)}
                    key={item.name}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1
                className="font-bold cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout 📤
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
