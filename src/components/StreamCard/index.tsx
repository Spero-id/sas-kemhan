"use client";

import Image from "next/image";
import RecordingCamera from "../RecordingCamera";
import Link from "next/link";
import { MdPushPin } from "react-icons/md";
import StarStream from "./StarStream";

interface Props {
  path_slug: string;
  name: string;
  redirect: string;
  active?: boolean;
  pin?: boolean;
  type: 1 | 2 | 3; // 1 = cctv, 2 = helmet, 3 = body_worm,
  star: boolean
}

const MEDIAMTX_URL = process.env.NEXT_PUBLIC_MEDIAMTX_URL;
const MEDIAMTX_RTSP = process.env.NEXT_PUBLIC_MEDIAMTX_RTSP;

const StreamCard = ({ path_slug, name, redirect, active, pin = false, type, star }: Props) => {
  return (
    <div className="relative h-full w-full">
      <iframe
        src={`${MEDIAMTX_URL}/${path_slug}`}
        allow="fullscreen; autoplay; encrypted-media"
        className="w-full h-full pointer-events-auto border-none"
        title={path_slug}
      />
      {!active && (
        <Image
          src="/images/frame.png"
          alt="frame"
          fill
          className="z-10 pointer-events-none group-hover:hidden"
        />
      )}
      <Image
        src="/images/frame-active.png"
        alt="frame-active"
        fill
        className="z-10 pointer-events-none hidden group-hover:block"
      />

      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded text-base">
        {name}
      </div>

      <div className="absolute bottom-12 right-4 flex flex-col gap-1 z-20">
        <StarStream type={type} path_slug={path_slug} star={star} />
        <RecordingCamera
          pathSlug={path_slug ?? ""}
          rtspUrl={`rtsp://${MEDIAMTX_RTSP}/${path_slug}`}
        />
        <Link
          href={redirect}
          className={`p-1 rounded text-2xl cursor-pointer pointer-events-auto ${pin ? "text-yellow-500" : ''}`}
        >
          <MdPushPin />
        </Link>
      </div>
    </div>
  );
};

export default StreamCard;
