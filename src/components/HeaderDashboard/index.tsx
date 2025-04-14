import Image from "next/image";

const Header = () => {
  return (
    <header className="h-[7.4rem] bg-header bg-cover bg-center bg-no-repeat font-conthrax flex flex-nowrap justify-between items-center px-8">
      <div>
        <h1 className="text-cyan-neon text-5xl font-semibold tracking-wider">
          07:45
        </h1>
        <p className="uppercase text-white text-xl tracking-widest">
          12 FEB 2024
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
          <h3 className="text-3xl font-semibold text-cyan-neon">John Doe</h3>
          <p className="text-lg text-white">Admin SAS</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
