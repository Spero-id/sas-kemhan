import { signOut } from "next-auth/react";
import { BsBoxArrowLeft } from "react-icons/bs";

export function ButtonLogout() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <button
      onClick={handleLogout}
    >
      <BsBoxArrowLeft />
      Log Out
    </button>
  );
}
