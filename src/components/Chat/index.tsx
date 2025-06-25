"use client";

import { useState } from "react";
import { MdMessage } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import ChatUser from "./ChatUser";

export default function Chat() {
  const [modalChat, setModalChat] = useState(false);
  
  return (
    <>
      <button
        className="border border-cyan-neon rounded-md p-3 w-fit fixed bottom-3 right-3 cursor-pointer shadow-md bg-dark-ocean z-[999]"
        type="button"
        onClick={() => setModalChat(true)}
      >
        <MdMessage className="text-cyan-neon text-2xl" />
      </button>

      <div
        className={`w-96 max-w-none fixed bottom-20 right-3 m-0 bg-dark-ocean border border-cyan-neon rounded-md z-[999] ${
          modalChat ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between bg-deep-teal p-3 text-white rounded-t-md">
          <h5>Chating EYESEE</h5>
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={() => setModalChat(false)}
          />
        </div>

        <ChatUser user_id={3} modalChat />
      </div>
    </>
  );
}