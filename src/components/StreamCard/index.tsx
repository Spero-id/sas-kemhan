"use client";

import Image from "next/image";
import RecordingCamera from "../RecordingCamera";
import Link from "next/link";
import StarStream from "./StarStream";
import { FaExpandArrowsAlt, FaEye } from "react-icons/fa";
import { useState } from "react";

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


      {!active ? (
        <div className=" inset-0 flex flex-col items-center justify-center w-full h-full bg-gray-300 rounded-lg ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2H4z" />
            <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-gray-500 text-sm">Camera Offline</span>
        </div>
      ) : (
        <iframe
          src={`${MEDIAMTX_URL}/${path_slug}`}
          allow="fullscreen; autoplay; encrypted-media"
          className="w-full h-full pointer-events-auto border-none"
          title={path_slug}
        />
      )}


      {!active ? (
        <Image
          src="/images/frame.png"
          alt="frame"
          fill
          className="z-10 pointer-events-none group-hover:hidden"
        />
      ) : (
        <Image
          src="/images/frame-active.png"
          alt="frame-active"
          fill
          className="z-10 pointer-events-none hidden group-hover:block"
        />
      )}



      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded text-base">
        {name}
      </div>


      <button
        className=" absolute top-4 left-2 px-4 py-1 rounded text-white  z-20 cursor-pointer pointer-events-auto"
        onClick={() => {
          const dialog = document.getElementById('my_modal_1') as HTMLDialogElement | null;
          const modalTitle = document.getElementById('modal-title');
          const modalIframe = document.getElementById('modal-iframe') as HTMLIFrameElement | null;
          if (modalIframe) {
            modalIframe.src = `${MEDIAMTX_URL}/${path_slug}`;
          }
          if (modalTitle) {
            modalTitle.innerText = name;
          }
          dialog?.showModal();
        }}
      >
        <FaExpandArrowsAlt />
      </button>



      <div className="absolute bottom-12 right-4 flex flex-col gap-1 z-20">
        <StarStream type={type} path_slug={path_slug} star={star} />


        <RecordingCamera
          pathSlug={path_slug ?? ""}
          rtspUrl={`rtsp://${MEDIAMTX_RTSP}/${path_slug}`}
        />
        <Link
          href={redirect}
          className={`p-1 rounded text-xl cursor-pointer pointer-events-auto ${pin ? "text-yellow-500" : ''}`}
        >
          <FaEye className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default StreamCard;
