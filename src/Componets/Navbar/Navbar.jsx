import React, { useContext } from "react";
import ThemeSwicher from "../ThemeSwicher";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const item = [
  { item: "Home", url: "/" },
  { item: "Blogs", url: "/blog" },
  { item: "Abount", url: "/about" },
  { item: "Contact", url: "/contact" },
];
import { UserContext } from "../../Context/Context";
function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useContext(UserContext);
  console.log(token);
  return (
    <div className="w-full h-16 flex justify-between dark:bg-slate-800  border-black">
      <div className="fixed h-16 w-full flex justify-between dark:bg-slate-800  bg-slate-100 ">
      <div className="flex "></div>
      <div className="flex ">
        <ul className="flex items-center">
          {item.map((value) => {
            return (
              <li
              onClick={()=>navigate(value.url)}
                key={value.item}
                className=" px-3 mx-4 items-center font-bold antialiased"
              >
                {value.item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-end items-center h-full mr-3">
        {token == null ? (
          <CiLogin
            onClick={() => navigate("/login")}
            className="border-2 dark:border-white  border-black h-12 w-12 rounded-md mr-2 p-2"
          />
        ) : (
          <CiLogout
            onClick={() => logout()}
            className="border-2 dark:border-white  border-black h-12 w-12 rounded-md mr-2 p-2"
          />
        )}
        <ThemeSwicher />
      </div>
      </div>
    </div>
  );
}

export default Navbar;
