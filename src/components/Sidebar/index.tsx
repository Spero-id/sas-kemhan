import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="drawer-side">
      <label
        htmlFor="sidebar"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <Link
            href="/user"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname?.includes("user") && "bg-graydark dark:bg-meta-4"
            }`}
          >
            User
          </Link>
        </li>
        <li>
          <Link
            href="/role"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname?.includes("role") && "bg-graydark dark:bg-meta-4"
            }`}
          >
            Role
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
