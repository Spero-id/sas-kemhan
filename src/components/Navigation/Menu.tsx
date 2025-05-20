import Link from "next/link";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { MdCamera, MdSensorOccupied } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function MenuNavigation() {
  const pathname = usePathname();
  return (
    <div className="flex gap-3">
      <Link
        href="/"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
          pathname === "/"
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
        }`}
      >
        <TbDeviceCctvFilled />
        CCTV
      </Link>
      <Link
        href="/sensor-gerak"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
          pathname?.includes("sensor-gerak")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
        }`}
      >
        <MdSensorOccupied />
        Sensor Gerak
      </Link>
      <Link
        href="/body-worn"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
          pathname?.includes("body-worn")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
        }`}
      >
        <MdCamera />
        Body-Worn Camera
      </Link>
    </div>
  );
}
