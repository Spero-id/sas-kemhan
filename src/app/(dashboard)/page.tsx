import { IoMdQrScanner } from "react-icons/io";
import { MdPushPin } from "react-icons/md";
import { TfiTarget } from "react-icons/tfi";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[70vh]">
      {Array.from({ length: 12 }, (_, i) => (
        <div className="relative rounded-md overflow-hidden border-2 border-cyan-neon" key={i}>
          {/* <Image
            src=""
            alt="CCTV"
            className=" h-auto"
            width={300}
            height={200}
          /> */}

          <div className="w-full h-full bg-slate-800">
          </div>

          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            CCTV 1
          </div>

          <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-green-400 text-xs font-bold px-2 py-1 rounded">
            ● ONLINE
          </div>

          <div className="absolute top-10 left-3 text-white text-sm">
            00:15:145
          </div>

          <div className="absolute bottom-3 right-2 flex flex-col gap-1">
            <button className="p-1 rounded text-white text-lg">
              <TfiTarget />
            </button>
            <button className="p-1 rounded text-white text-lg">
              <MdPushPin />
            </button>
            <button className="p-1 rounded text-white text-lg">
              <IoMdQrScanner />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 text-white text-sm">
            <div className="font-bold">John Doe</div>
            <div className="text-xs">12/02/2025, 07:45</div>
          </div>
        </div>
      ))}
    </div>
  );
}
