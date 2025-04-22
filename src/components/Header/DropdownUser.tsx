"use client";

import { ButtonLogout } from "./ButtonLogout";
import Image from "next/image";

const DropdownUser = () => {
  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="Tailwind CSS Navbar component"
            src=""
            width={40}
            height={40}
          />
        </div>
      </button>
      <ul
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <ButtonLogout/>
        </li>
      </ul>
    </div>
  );
};

export default DropdownUser;
