"use client";

import { useSession } from "next-auth/react";
import { ButtonLogout } from "./ButtonLogout";
import Image from "next/image";

const DropdownUser = () => {
  const { data } = useSession();

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            alt="Awatar"
            src={data?.user?.image?.trim() ? data.user.image : "/images/profile.png"}
            width={40}
            height={40}
          />
        </div>
      </button>
      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
          <ButtonLogout />
        </li>
      </ul>
    </div>
  );
};

export default DropdownUser;
