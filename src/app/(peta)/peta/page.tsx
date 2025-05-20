"use client";

import "leaflet/dist/leaflet.css";
import Chat from "@/components/Chat";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { useAllPeople } from "@/services/api/maps/get/get.hooks";

export default function Peta() {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => LoadingGetData(),
        ssr: false,
      }),
    []
  );

  const { isLoading, data } = useAllPeople();

  return (
    <>
      <Link
        href="/"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border w-fit fixed top-3 left-16 z-[999]`}
      >
        <IoIosArrowBack />
        Back
      </Link>
      <div style={{ height: "100vh", width: "100%" }}>
        {isLoading ? <LoadingGetData /> : <MapComponent data={data} />}
      </div>
      <Chat />
    </>
  );
}
