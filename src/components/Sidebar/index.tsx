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
        {/* Sidebar content here */}
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
