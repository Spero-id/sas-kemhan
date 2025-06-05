"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { SlPicture } from "react-icons/sl";
import { ResponseAllCctv } from "@/types/Cctv/TypeCctv";
import { useEffect } from "react";

const NEXT_PUBLIC_MAPS = process.env.NEXT_PUBLIC_MAPS;

// Inisialisasi icon
const cctvIcon = L.icon({
  iconUrl: "/images/map/cctv.png",
  iconSize: [30, 30],
});

// Komponen untuk mengatur view berdasarkan marker
function MapController({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length) {
      const group = L.featureGroup(positions.map((pos) => L.marker(pos)));
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [positions, map]);

  return null;
}

type MapProps = {
  data: ResponseAllCctv;
};

export default function MapComponent({ data }: Readonly<MapProps>) {
  if (!data || !data.data || data.data.length === 0) return null;

  // Ambil semua posisi dari data
  const markerPositions = data.data
  .map((item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.long);

    if (isNaN(lat) || isNaN(lng)) return null;
    return [lat, lng] as [number, number];
  })
  .filter((pos): pos is [number, number] => pos !== null);

  return (
    <MapContainer
      center={[0, 0]} // Default, nanti akan diatur oleh MapController
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url={`${NEXT_PUBLIC_MAPS}/tile/{z}/{x}/{y}.png`} />

      {/* Menampilkan semua marker */}
      {data.data.map((item, i) => (
        <Marker
          key={i}
          position={[parseFloat(item.lat), parseFloat(item.long)]}
          icon={cctvIcon}
        >
          <Tooltip direction="top" offset={[0, -30]} opacity={1} sticky>
            <div
              style={{
                backgroundColor: "#00161D",
                width: "400px",
                border: "1px solid #03FAFA",
              }}
              className="p-5"
            >
              <div className="relative h-48">
                <Image
                  src="/images/preview.png"
                  alt="CCTV"
                  className="w-full h-full object-cover absolute"
                  width={75}
                  height={50}
                />
                <Image
                  src="/images/frame-detail.png"
                  alt="frame-detail"
                  fill
                  className="z-10 pointer-events-none"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded text-base">
                  {item.name} - {item.id}
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1 rounded text-base">
                  ONLINE
                </div>
                <div className="absolute top-14 left-4 text-white text-base">
                  00:15:145
                </div>
              </div>
              <div className="flex mt-4 justify-between">
                <p className="text-yellow-400 font-semibold text-lg">
                  Informasi CCTV
                </p>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center bg-deep-teal text-white px-3 py-1 rounded gap-2">
                    <TbDeviceCctvFilled />
                    Lihat CCTV
                  </div>
                  <div className="flex items-center justify-center bg-deep-teal text-white text-opacity-50 py-2 px-2 rounded">
                    <SlPicture />
                  </div>
                </div>
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}

      {/* Controller untuk auto zoom & center */}
      <MapController positions={markerPositions} />
    </MapContainer>
  );
}
