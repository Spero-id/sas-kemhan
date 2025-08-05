"use client";

import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { ResponseAllCctv } from "@/types/Cctv/TypeCctv";
import { useEffect, useState } from "react";
import StreamCard from "../StreamCard";
import Link from "next/link";
import { LatLngTuple } from "leaflet";

const NEXT_PUBLIC_MAPS = process.env.NEXT_PUBLIC_MAPS;

// Inisialisasi icon
const cctvIcon = L.icon({
  iconUrl: "/images/map/map_cctv_v3.png",
  iconSize: [40, 40],
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
  const [position, setPosition] = useState<LatLngTuple>([-2.548926, 118.0148634]);
  const [zoom, setZoom] = useState(15);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('satellite');

  useEffect(() => {
    // Cek apakah geolocation tersedia di browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude] as LatLngTuple);
          setZoom(13); // Zoom lebih dekat ke lokasi user
          console.log(position);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Tetap gunakan default jika gagal
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser ini.");
    }
  }, []);

  // Map tile URLs
  const MAP_TILE_URLS = {
    standard: `${NEXT_PUBLIC_MAPS}/tiles/standard/{z}/{x}/{y}.png`,
    satellite: `${NEXT_PUBLIC_MAPS}/tiles/satellite/{z}/{x}/{y}.jpg`,
    terrain: `${NEXT_PUBLIC_MAPS}/tiles/terrain/{z}/{x}/{y}.jpg`,
  };

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
    <div style={{ height: "100%", width: "100%" }}>
      {/* Dropdown untuk memilih tipe map di pojok kiri bawah */}
      <div style={{ position: "absolute", zIndex: 1000, left: 16, bottom: 16, background: "white", padding: "8px 12px", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <label htmlFor="mapType" style={{ marginRight: 8 }}>Tipe Peta:</label>
        <select
          id="mapType"
          value={mapType}
          onChange={e => setMapType(e.target.value as 'standard' | 'satellite' | 'terrain')}
          style={{ padding: "4px 8px", borderRadius: 4 }}
        >
          <option value="standard">Standard</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>
      <MapContainer
        center={position} // Default, nanti akan diatur oleh MapController
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={MAP_TILE_URLS[mapType]} />

        {/* Menampilkan semua marker */}
        {data.data.map((item, i) => (
          <Marker
            key={i}
            position={[parseFloat(item.lat), parseFloat(item.long)]}
            icon={cctvIcon}
            title={item.name}
          >
            <Popup
              maxWidth={800}
              autoClose={false} // Agar popup tidak tertutup otomatis
              className="custom-popup"
              closeButton={false}
            >
              <div className="w-96">
                <div className="relative h-48">
                  <StreamCard
                    path_slug={item?.path_slug}
                    name={item?.name}
                    redirect={`/cctv/${item?.id}`}
                    type={1}
                    star={item?.star}
                  />
                </div>
                <div className="flex mt-4 justify-between items-center h-8">
                  <p className="text-yellow-400 font-semibold text-lg">
                    Informasi CCTV
                  </p>
                  <Link
                    href={`/cctv/${item?.id}`}
                    className="flex items-center justify-center bg-deep-teal !text-white px-3 py-1 rounded gap-2 h-8"
                  >
                    <TbDeviceCctvFilled />
                    Lihat CCTV
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Controller untuk auto zoom & center */}
        <MapController positions={markerPositions} />
      </MapContainer>
    </div>
  );
}
