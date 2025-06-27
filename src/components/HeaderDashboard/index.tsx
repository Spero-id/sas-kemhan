import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ButtonLogout } from "../Header/ButtonLogout";

const HeaderDashboard = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const { data: session, status } = useSession();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const monthNames = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MEI",
        "JUN",
        "JUL",
        "AGU",
        "SEP",
        "OKT",
        "NOV",
        "DES",
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();

      setTime(`${hours}:${minutes}`);
      setDate(`${day} ${month} ${year}`);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <header className="h-[7.4rem] bg-header bg-cover bg-center bg-no-repeat font-conthrax flex flex-nowrap justify-between items-center px-8">
      <div>
        <h1 className="text-cyan-neon text-5xl font-semibold tracking-wider">
          {time}
        </h1>
        <p className="uppercase text-white text-xl tracking-widest">{date}</p>
      </div>
      <h1 className="uppercase text-3xl font-semibold text-white tracking-[.3rem]">
        EYESEE
      </h1>
      <div className="flex gap-3">
        {status == 'authenticated' && (
          <div className="dropdown dropdown-end">
            <button className="btn border-0 bg-transparent text-left focus:bg-transparent">
              <div className="p-1 relative flex items-center justify-center">
                <Image
                  src={session?.user?.image?.trim() ? session.user.image : "/images/profile.png"}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="object-cover absolute"
                />
                <Image
                  src="/images/frame-profile.png"
                  alt="avatar"
                  width={60}
                  height={60}
                  className="z-10 relative"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-semibold text-cyan-neon">
                  {session?.user?.name}
                </h3>
                <p className="text-lg text-white">{session?.user?.role?.name}</p>
              </div>
            </button>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2">
              <li>
                <ButtonLogout />
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderDashboard;
