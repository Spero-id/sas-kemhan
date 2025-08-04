import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import VideoUpload from "./VideoUpload";
import VoiceRecorder from "./VoiceRecorder";
import Message from "./Message";
import { useDetailUser } from "@/services/api/user/get/get.hooks";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoadingGetData from "../Loading/LoadingGetData";

interface ChatUserProps {
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  user_id: number;
  modalChat: boolean;
}

export default function ChatUser({
  user_id,
  modalChat,
  setUserId,
}: ChatUserProps) {
  const { data: session, status } = useSession();
  const { data: user, isLoading } = useDetailUser({
    id: user_id.toString(),
  });
  const [roomId, setRoomId] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || isLoading) return;
    console.log(user);

    const newRoomId = [session.user.id, user_id].sort().join("_");
    setRoomId(newRoomId);

    fetch("/api/socket");

    const newSocket = io({
      auth: {
        token: session.access_token,
      },
    });

    newSocket.emit("join_room", newRoomId);

    // Setelah join_room, kita fetch pesan
    newSocket.on("connect", async () => {
      await fetchMessages(1, newRoomId);
    });

    newSocket.on("chat:message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [status, isLoading]);

  const fetchMessages = async (pageToFetch: number, roomId?: string) => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;
    setIsLoadingMessages(true);

    try {
      const res = await fetch(
        `/api/secure/chat?page=${pageToFetch}&roomId=${roomId}`
      );
      const { data, hasMore: more } = await res.json();

      setMessages((prev) => [...data, ...prev]);
      setPage(pageToFetch + 1);
      setHasMore(more);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      isFetchingRef.current = false;
      setIsLoadingMessages(false);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    if (containerRef.current.scrollTop === 0) {
      fetchMessages(page, roomId);
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

  const handleBack = () => {
    setUserId(undefined);
  };

  return status == "authenticated" && !isLoading ? (
    <>
      <div className="flex items-center bg-slate-50 bg-opacity-5 px-4 py-3">
        <button onClick={handleBack}>
          <IoMdArrowRoundBack className="text-xl mr-1" />
        </button>
        <div className="avatar mr-3">
          <div className="w-10 rounded-full overflow-hidden">
            <Image
              src={
                user?.data?.image?.trim()
                  ? user.data.image
                  : "/images/profile.png"
              }
              alt="avatar"
              width={20}
              height={20}
              className="object-cover"
            />
          </div>
        </div>
        <span>{user?.data?.name}</span>
      </div>

      <div
        ref={containerRef}
        className="p-4 h-80 overflow-y-scroll flex flex-col gap-3"
        onScroll={handleScroll}
      >
        {isLoadingMessages && (
          <div className="flex flex-col gap-2">
            <LoadingGetData />
          </div>
        )}

        {!isLoadingMessages &&
          messages.map((msg, i) => 
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
        <VideoUpload roomId={roomId} userLogged={session.user.id} />
        <VoiceRecorder roomId={roomId} userLogged={session.user.id} />
        <Message socket={socket} roomId={roomId} userLogged={session.user.id} />
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-80">
      <p>Loading...</p>
    </div>
  );
}

const messageContent = (msg: any) => {
  const date = new Date(msg.created_at);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
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
