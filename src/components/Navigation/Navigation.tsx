import Link from "next/link";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { MdCamera, MdSensorOccupied } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

interface NavigationProps {
  search: string;
}

const Navigation = ({ search }: NavigationProps) => {
  return (
    <div className="flex justify-between my-4">
      <div className="flex gap-3">
        <Link
          href="/skill"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border-cyan-neon border`}
        >
          <TbDeviceCctvFilled />
          CCTV
        </Link>
        <Link
          href="/skill"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border-transparent border opacity-50`}
        >
          <MdSensorOccupied />
          Sensor Gerak
        </Link>
        <Link
          href="/skill"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border-transparent border opacity-50`}
        >
          <MdCamera />
          Body-Worn Camera
        </Link>
      </div>
      <div className="flex gap-3">
        <select defaultValue="Pick a color" className="select bg-deep-teal bg-opacity-50 rounded text-white">
          <option>Semua</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <label className="input input-bordered flex items-center gap-2 bg-deep-teal bg-opacity-50 rounded text-white">
          <input type="text" className="grow" placeholder="Cari" />
          <CiSearch />
        </label>
        <div className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3">
          <Image src="/icons/filter.svg" alt="filter" width={25} height={25} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
