"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ButtonLogout } from "./ButtonLogout";

const DropdownUser = () => {
  const { data: session } = useSession();

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
