"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { ResponseAllCctv } from "@/types/Cctv/TypeCctv";
import { useEffect } from "react";
import StreamCard from "../StreamCard";
import Link from "next/link";

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
          <Popup
            maxWidth={600}
            autoClose={false} // Agar popup tidak tertutup otomatis
            closeOnClick={false} // Agar tidak tertutup saat klik di luar
            className="custom-popup"
          >
            <div
              style={{
                backgroundColor: "#00161D",
                border: "1px solid #03FAFA",
              }}
              className="p-5"
            >
              <div className="relative h-48">
                <StreamCard
                  path_slug={item?.path_slug}
                  name={item?.name}
                  redirect={`/cctv/${item?.id}`}
                />
              </div>
              <div className="flex mt-4 justify-between">
                <p className="text-yellow-400 font-semibold text-lg">
                  Informasi CCTV
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/cctv/${item?.id}`}
                    className="flex items-center justify-center bg-deep-teal text-white px-3 py-1 rounded gap-2"
                  >
                    <TbDeviceCctvFilled />
                    Lihat CCTV
                  </Link>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Controller untuk auto zoom & center */}
      <MapController positions={markerPositions} />
    </MapContainer>
  );
}
