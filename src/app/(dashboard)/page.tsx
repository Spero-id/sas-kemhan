"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import HLSPlayer from "@/components/HLSPlayer";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { IoMdQrScanner } from "react-icons/io";
import { MdPushPin } from "react-icons/md";
import { TfiTarget } from "react-icons/tfi";

const MEDIAMTX_URL = process.env.NEXT_PUBLIC_MEDIAMTX_URL;

const DynamicWebRTCPlayer = dynamic(() => import('@components/WebRTCPlayer'), {
  ssr: false, // Penting: Matikan Server-Side Rendering untuk komponen ini
});

export default function Home() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv();

  return (
    <>
      <Navigation />
      <div className="w-1/2 relative h-80">
        <DynamicWebRTCPlayer
          mediaMtxServerUrl="http://localhost:8889"
          streamPath="cam1"
        />
        {/* <HLSPlayer src={`${MEDIAMTX_URL}/cam1_transcoded/index.m3u8`} /> */}
      </div>
    </>
  );
}
