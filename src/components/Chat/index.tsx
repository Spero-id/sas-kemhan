"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function ChatClient() {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
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

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });

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
    <div>
      <div
        ref={containerRef}
        className="border p-4 h-64 overflow-y-scroll"
        onScroll={handleScroll}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg.content}</div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="border px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
