import Image from "next/image";

export default function DetailCctv() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-900 text-white font-sans min-h-screen">
      <div className="col-span-2 bg-gray-800 rounded-xl overflow-hidden relative">
        <div className="relative">
          <Image
            src=""
            alt="CCTV 1"
            className="w-full h-64 object-cover"
            width={600}
            height={350}
          />
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
            CCTV 1
          </div>
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
            ONLINE
          </div>
          <div className="absolute bottom-2 left-2 text-sm">
            <div className="font-semibold text-lg">John Doe</div>
            <div className="text-xs">12/02/2025, 07:45</div>
          </div>
        </div>
      </div>

      <div className="col-span-2 grid grid-cols-3 gap-2">
        <template id="cam-template">
          <div className="relative bg-gray-800 rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/200x100"
              className="w-full h-24 object-cover"
            />
            <div className="absolute top-1 left-1 bg-gray-700 text-xs px-1 py-0.5 rounded">
              CCTV X
            </div>
            <div className="absolute top-1 right-1 bg-green-500 text-xs px-1 py-0.5 rounded">
              ONLINE
            </div>
            <div className="absolute bottom-1 left-1 text-xs">
              <div>John Doe</div>
              <div>12/02/2025, 07:45</div>
            </div>
          </div>
        </template>
        <div className="relative bg-gray-800 rounded-xl overflow-hidden">
          <img
            src="https://via.placeholder.com/200x100"
            className="w-full h-24 object-cover"
          />
          <div className="absolute top-1 left-1 bg-gray-700 text-xs px-1 py-0.5 rounded">
            CCTV 2
          </div>
          <div className="absolute top-1 right-1 bg-green-500 text-xs px-1 py-0.5 rounded">
            ONLINE
          </div>
          <div className="absolute bottom-1 left-1 text-xs">
            <div>John Doe</div>
            <div>12/02/2025, 07:45</div>
          </div>
        </div>
      </div>

      <div className="col-span-3 flex gap-4 mt-4">
        <div className="flex-1 bg-gray-800 p-2 rounded-xl text-sm">
          <img
            src="https://via.placeholder.com/150"
            className="w-full rounded mb-1"
          />
          <div>Lokasi: Hambalang, Jawa Barat</div>
        </div>
        <div className="flex-1 bg-gray-800 p-2 rounded-xl text-sm">
          <img
            src="https://via.placeholder.com/150"
            className="w-full rounded mb-1"
          />
          <div>Latitude: -6.600000, Longitude: 109.817777</div>
        </div>
        <div className="flex-1 bg-gray-800 p-2 rounded-xl text-sm">
          <img
            src="https://via.placeholder.com/150"
            className="w-full rounded mb-1"
          />
          <div>Geonofografi: 5.567 MDPL</div>
        </div>
      </div>

      <div className="col-span-1 grid grid-cols-1 gap-2 mt-4">
        <div className="bg-red-600 p-4 text-center rounded-xl">SG 01</div>
        <div className="bg-red-600 p-4 text-center rounded-xl">SG 02</div>
        <div className="bg-cyan-600 p-4 text-center rounded-xl">SG 03</div>
      </div>
    </div>
  );
}
