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
    <header className="h-[7.4rem] bg-header bg-cover bg-center bg-no-repeat font-conthrax flex flex-nowrap justify-between items-center px-4 md:px-8 lg:px-16 xl:px-24">
      <div>
        <h1 className="text-cyan-neon text-3xl md:text-5xl font-semibold tracking-wider">
          {time}
        </h1>
        <p className="uppercase text-white text-base md:text-xl tracking-widest">{date}</p>
      </div>
      <h1 className="hidden md:block uppercase text-2xl md:text-3xl font-semibold text-white tracking-[.3rem]">
        EYESEE
      </h1>
      <div className="flex gap-2 md:gap-3 items-center">
        {status == 'authenticated' && (
          <div className="dropdown dropdown-end">
            <button className="btn border-0 bg-transparent text-left focus:bg-transparent p-0 min-h-0 h-auto">
              <div className="p-1 relative flex items-center justify-center">
                <Image
                  src={session?.user?.image?.trim() ? session.user.image : "/images/profile.png"}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="object-cover absolute w-10 h-10 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src="/images/frame-profile.png"
                  alt="avatar"
                  width={48}
                  height={48}
                  className="z-10 relative w-12 h-12 md:w-[60px] md:h-[60px]"
                />
              </div>
              <div className="flex flex-col justify-center ml-2">
                <h3 className="text-lg md:text-3xl font-semibold text-cyan-neon">
                  {session?.user?.name}
                </h3>
                <p className="text-xs md:text-lg text-white">{session?.user?.role?.name}</p>
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
