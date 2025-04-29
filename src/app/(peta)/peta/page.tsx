"use client";

// pages/index.tsx
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import Chat from "@/components/Chat";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

// Biasakan inisialisasi tipe koordinat
const center: [number, number] = [-0.385, 113.885];

const SetView = ({
  coords,
  zoom,
}: {
  coords: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, zoom);
  }, [coords, zoom]);
  return null;
};

export default function Home() {
  const circleOptions = [
    { radius: 100, color: "#F9E400" }, // kuning
    { radius: 200, color: "#B96600" }, // coklat
    { radius: 300, color: "#06B500" }, // hijau
    { radius: 400, color: "#005F3F" }, // hijau tua
  ];

  return (
    <>
      <Link
        href="/cctv"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border w-fit fixed top-3 left-16 z-[999]`}
      >
        <IoIosArrowBack/>
        Back
      </Link>
      <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <SetView coords={center} zoom={17} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          {circleOptions.map((opt, i) => (
            <Circle
              key={i}
              center={center}
              pathOptions={{ color: opt.color, fillOpacity: 0.3 }}
              radius={opt.radius}
            />
          ))}

          <Marker
            position={center}
            icon={L.divIcon({
              className: "hq-icon",
              html: `<div style="background:#000;padding:4px 8px;border-radius:4px;color:#fff;font-weight:bold">HQ</div>`,
              iconSize: [40, 20],
              iconAnchor: [20, 10],
            })}
          />

          <Marker
            position={[-0.383, 113.883]}
            icon={L.icon({
              iconUrl: "/images/map/flag.png",
              iconSize: [20, 20],
            })}
          />
          <Marker
            position={[-0.384, 113.883]}
            icon={L.icon({
              iconUrl: "/images/map/cctv.png",
              iconSize: [200, 200],
            })}
          />
          <Marker
            position={[-0.385, 113.883]}
            icon={L.icon({
              iconUrl: "/images/map/people.png",
              iconSize: [20, 20],
            })}
          />
        </MapContainer>
      </div>
      <Chat />
    </>
  );
}
