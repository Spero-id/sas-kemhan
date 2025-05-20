import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import Image from "next/image";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { SlPicture } from "react-icons/sl";
import { MdMessage } from "react-icons/md";
import { RiCameraLensFill } from "react-icons/ri";
import { useAllPeople } from "@/services/api/maps/get/get.hooks";
import LoadingTableCustom from "../Loading/LoadingTableCustom";
import { People } from "@/types/Maps/TypeMaps";

// Biasakan inisialisasi tipe koordinat
const center: [number, number] = [-6.705974, 106.994278];

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

export default async function MapComponent() {
  const { isLoading, data } = useAllPeople();

  const circleOptions = [
    { radius: 100, color: "#F9E400" }, // kuning
    { radius: 200, color: "#B96600" }, // coklat
    { radius: 300, color: "#06B500" }, // hijau
    { radius: 400, color: "#005F3F" }, // hijau tua
  ];

  if (isLoading) return <LoadingTableCustom />;

  return (
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
      >
        <Tooltip
          direction="top"
          offset={[0, -30]}
          opacity={1}
          permanent={false}
          sticky
        >
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
                John Doe - CCTV 1
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

      {data?.map((item: People, i: number) => {
        const lat = parseFloat(item?.data?.latitude);
        const lng = parseFloat(item?.data?.longitude);

        // Validasi angka
        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <Marker
            position={[lat, lng]}
            icon={L.icon({
              iconUrl: "/images/map/people.png",
              iconSize: [20, 20],
            })}
            key={i}
          >
            <Tooltip
              direction="top"
              offset={[0, -30]}
              opacity={1}
              permanent={false}
              sticky
            >
              <div
                style={{
                  backgroundColor: "#00161D",
                  width: "400px",
                  border: "1px solid #03FAFA",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 103, 135, 0.5)",
                    padding: "10px 20px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#E90000",
                      color: "#fff",
                      width: "30%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                      textTransform: "uppercase",
                      fontSize: "12px",
                    }}
                  >
                    Online
                  </div>
                  <div
                    style={{
                      color: "#03FAFA",
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    Penjaga Pos 2
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                    }}
                  >
                    <div className="p-1 relative flex items-center justify-center">
                      <Image
                        src="/images/profile.png"
                        alt="avatar"
                        width={90}
                        height={90}
                        className="object-cover absolute"
                      />
                      <Image
                        src="/images/frame-profile.png"
                        alt="avatar"
                        width={100}
                        height={100}
                        className="z-10 relative"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "70%",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {item.device_id}
                    </h1>
                    <span
                      style={{
                        fontSize: "17px",
                        color: "#FFFFFF",
                        fontWeight: "300",
                      }}
                    >
                      Sniper | Regu Alfa
                    </span>
                    <div className="flex justify-end gap-2 w-full mt-2">
                      <div className="flex items-center justify-center bg-deep-teal text-white text-opacity-50 py-2 px-2 rounded">
                        <SlPicture />
                      </div>
                      <div className="flex items-center justify-center bg-deep-teal text-white text-opacity-50 py-2 px-2 rounded">
                        <MdMessage />
                      </div>
                      <div className="flex items-center justify-center bg-red-500 text-white py-2 px-2 rounded gap-1">
                        <RiCameraLensFill /> ON
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
