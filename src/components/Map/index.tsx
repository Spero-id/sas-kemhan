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

export default function MapComponent() {
  const circleOptions = [
    { radius: 100, color: "#F9E400" }, // kuning
    { radius: 200, color: "#B96600" }, // coklat
    { radius: 300, color: "#06B500" }, // hijau
    { radius: 400, color: "#005F3F" }, // hijau tua
  ];

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
      />

      <Marker
        position={[-0.385, 113.883]}
        icon={L.icon({
          iconUrl: "/images/map/people.png",
          iconSize: [20, 20],
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
              backgroundColor: "#00293B",
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
                }}
              >
                Penjaga Pos 2
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#00161D",
              }}
            >
              <div
                style={{
                  width: "30%",
                }}
              ></div>
              <div>
                <h1>KOPDA. JOHN DOE</h1>
                <span>Sniper | Regu Alfa</span>
                <div></div>
              </div>
            </div>
          </div>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
