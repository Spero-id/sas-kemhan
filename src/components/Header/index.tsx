import DropdownUser from "./DropdownUser";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <div className="navbar bg-white shadow bg-red flex justify-between">
      <div className="flex-none">
        <label htmlFor="sidebar" className="btn btn-square btn-ghost text-lg">
          <IoMenu />
        </label>
      </div>
      <div className="flex-none">
        <DropdownUser />
      </div>

    </div>
  );
};

export default Header;
