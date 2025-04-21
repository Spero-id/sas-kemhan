"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { MdMessage } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

export default function Chat() {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [modalChat, setModalChat] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      await fetchMessages(1);
    };
    init();

    fetch("/api/socket");
    const newSocket = io();

    newSocket.on("chat:message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchMessages = async (pageToFetch: number) => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    const res = await fetch(`/api/chat?page=${pageToFetch}`);
    const { data, hasMore: more } = await res.json();

    setMessages((prev) => [...data, ...prev]);
    setPage(pageToFetch + 1);
    setHasMore(more);
    isFetchingRef.current = false;
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    if (containerRef.current.scrollTop === 0) {
      fetchMessages(page);
    }
  };

  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.emit("chat:message", input);
      setInput("");
    }
  };

  return (
    <>
      <button
        className="border border-cyan-neon rounded-md p-3 w-fit fixed bottom-3 right-3 z-50 cursor-pointer shadow-md"
        type="button"
        onClick={() => setModalChat(true)}
      >
        <MdMessage className="text-cyan-neon text-2xl" />
      </button>

      <div className={`w-96 max-w-none fixed bottom-20 right-3 m-0 bg-dark-ocean border border-cyan-neon rounded-md ${modalChat ? "block" : "hidden"}`}>
        <div className="flex justify-between bg-deep-teal p-3 text-white rounded-t-md">
          <h5>Chating SAS</h5>
          <IoClose className="text-2xl cursor-pointer" onClick={() => setModalChat(false)} />
        </div>

        <div
          ref={containerRef}
          className="p-4 h-80 overflow-y-scroll"
          onScroll={handleScroll}
        >
          {messages.map((msg, i) => (
            <div key={i}>{msg.content}</div>
          ))}
        </div>

        <div className="flex mt-2 p-2">
          <input
            className="bg-deep-teal text-white px-3 py-2 rounded-l w-full bg-opacity-50"
            placeholder="Pesan"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="text-white px-3 py-1 rounded-r bg-deep-teal bg-opacity-50"
          >
            <IoSend className="text-cyan-neon" />
          </button>
        </div>
      </div>
    </>
  );
}
