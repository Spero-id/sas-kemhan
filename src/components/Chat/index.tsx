"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { MdMessage } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Message from "./Message";
import VoiceRecorder from "./VoiceRecorder";
import { useSession } from "next-auth/react";
import VideoUpload from "./VideoUpload";

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

  const handleScroll = () => {
    if (!containerRef.current) return;

    if (containerRef.current.scrollTop === 0) {
      fetchMessages(page);
    }
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
          <h5>Chating SAS</h5>
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={() => setModalChat(false)}
          />
        </div>

        <div
          ref={containerRef}
          className="p-4 h-80 overflow-y-scroll flex flex-col gap-3"
          onScroll={handleScroll}
        >
          {messages.map((msg, i) =>
            msg.user_id == session?.user.id ? (
              <div
                className="flex items-end flex-col gap-2 text-cyan-neon"
                key={i}
              >
                <p>{msg?.user?.name}</p>
                {messageContent(msg)}
              </div>
            ) : (
              <div
                className="flex items-start flex-col gap-2 text-cyan-neon"
                key={i}
              >
                <p>{msg?.user?.name}</p>
                {messageContent(msg)}
              </div>
            )
          )}
        </div>

        <div className="flex mt-2 p-2">
          <VideoUpload />
          <VoiceRecorder />
          <Message socket={socket} />
        </div>
      </div>
    </>
  );
}

const messageContent = (msg: any) => {
  const date = new Date(msg.created_at);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const timeOnly = `${hours}:${minutes}`;

  if (msg.type === "AUDIO") {
    return (
      <audio controls>
        <source src={msg.content} type="audio/webm" />
      </audio>
    );
  } else if (msg.type === "VIDEO") {
    return (
      <video controls>
        <source src={msg.content} type="video/mp4" />
      </video>
    );
  } else {
    return (
      <div className="bg-deep-teal text-white p-3 rounded-md max-w-[70%] break-all bg-opacity-50">
        {msg.content}
        <p className="text-xs text-right">{timeOnly}</p>
      </div>
    );
  }
};
