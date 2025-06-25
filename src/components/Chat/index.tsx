"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { MdMessage } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import ListUser from "./ListUser";

export default function Chat() {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [modalChat, setModalChat] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    // fetch messages sebelumnya
    (async () => {
      await fetchMessages(1);
    })();

    fetch("/api/socket");

    const newSocket = io({
      query: {
        token: session?.access_token,
      },
      withCredentials: true,
    });

    newSocket.on("chat:message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [session]);

  const fetchMessages = async (pageToFetch: number) => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    const res = await fetch(`/api/secure/chat?page=${pageToFetch}`);
    const { data, hasMore: more } = await res.json();

    setMessages((prev) => [...data, ...prev]);
    setPage(pageToFetch + 1);
    setHasMore(more);
    isFetchingRef.current = false;
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (modalChat) {
      setTimeout(scrollToBottom, 100);
    }
  }, [modalChat]);

  useEffect(() => {
    if (modalChat) {
      scrollToBottom();
    }
  }, [messages]);

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

        <ListUser />
      </div>
    </>
  );
}