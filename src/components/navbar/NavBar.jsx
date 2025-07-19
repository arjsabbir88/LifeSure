import React from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router";
import "animate.css";
import Button from "../Custom/button/Button";
import SecondButton from "../Custom/button/SecondButton";

const NavBar = () => {
  const links = (
    <>
      <NavLink
        to="/"
        className="flex items-center px-4 -mb-1 border-b-2 dark:border- "
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className="flex items-center px-4 -mb-1 border-b-2 dark:border- "
      >
        Dashboard{" "}
      </NavLink>
      <NavLink
        to="/policies"
        className="flex items-center px-4 -mb-1 border-b-2 dark:border- "
      >
        Policies{" "}
      </NavLink>
      <NavLink
        to="/agents"
        className="flex items-center px-4 -mb-1 border-b-2 dark:border- "
      >
        Agents{" "}
      </NavLink>
      <NavLink
        to="/faqs"
        className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
      >
        FAQs{" "}
      </NavLink>
    </>
  );

  return (
    <div>
      <header className="p-4 dark:bg-amber-100 dark:text-gray-800">
        <div className="container flex justify-between h-12 mx-auto">
          {/* logo here */}
          <Link to="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-12 h-12 mr-3">
                <img src={logo} alt="" />
              </div>
              <h1 className="text-2xl font-bold animate__animated animate__fadeInUp bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
                LifeSure
              </h1>
            </div>
          </Link>

          {/* links here */}
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {/* <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              >
                Link
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
              >
                Link
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
              >
                Link
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
              >
                Link
              </a>
            </li> */}
            {links}
          </ul>

          {/* auth button */}
          <div className="items-center flex-shrink-0 hidden lg:flex space-x-3">
            {/* <button className="self-center px-8 py-3 rounded">Sign in</button> */}

            {/* <button className="self-center px-8 py-3 font-semibold rounded dark:bg-[#059669] dark:text-gray-50">
              Sign up
            </button> */}
            {/* <SecondButton path={`/auth/login`}/> */}
            <Button path={`/auth/login`} text={`Login`}></Button>
            <Button path={`/auth/register`} text={`Register`}></Button>
          </div>

          {/* responsive button */}

          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
