import Image from "next/image";

export default function SensorGerak() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[70vh]">
      {Array.from({ length: 18 }, (_, i) => (
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center text-white border-2 border-cyan-400" key={i}>
          <div className="text-red-500 text-4xl">
            <Image
              src={"/icons/sensor.svg"}
              alt="Sensor"
              width={80}
              height={80}
              className="fill-red-700"
            />
          </div>
          <div className="mt-2 bg-yellow-500 text-black px-2 py-1 rounded">
            SG 01
          </div>
        </div>
      ))}
    </div>
  );
}
