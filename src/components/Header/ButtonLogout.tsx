import { signOut } from "next-auth/react";
import { BsBoxArrowLeft } from "react-icons/bs";

export function ButtonLogout() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <button
      className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      onClick={handleLogout}
    >
      <BsBoxArrowLeft />
      Log Out
    </button>
  );
}
