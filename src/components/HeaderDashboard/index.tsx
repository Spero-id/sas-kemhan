import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const HeaderDashboard = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  
  const { data: session } = useSession();
  

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MEI", "JUN",
        "JUL", "AGU", "SEP", "OKT", "NOV", "DES"
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
        <p className="uppercase text-white text-xl tracking-widest">
          {date}
        </p>
      </div>
      <h1 className="uppercase text-3xl font-semibold text-white tracking-[.3rem]">
        situational awarness system
      </h1>
      <div className="flex gap-3">
        <div className="border-2 border-cyan-neon p-1">
          <Image
            src="/images/profile.png"
            alt="avatar"
            width={60}
            height={60}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-semibold text-cyan-neon">{session?.user?.name}</h3>
          <p className="text-lg text-white">{session?.user?.role}</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
