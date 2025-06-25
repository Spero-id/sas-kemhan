import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function Message({ socket, roomId } : any) {
  const [input, setInput] = useState("");
  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.emit("chat:message", {
        roomId,
        msg: input
      });
      setInput("");
    }
  };

  return (
    <>
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
    </>
  );
}
