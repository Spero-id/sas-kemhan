"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

export default function VoiceRecorder({
  roomId,
  userLogged
}: Readonly<{ roomId: string, userLogged: string }>) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [isRecording, setIsRecording] = useState(false);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);

          recorder.ondataavailable = (e) => {
            audioChunks.current.push(e.data);
          };

          recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, {
              type: "audio/webm",
            });

            console.log(userLogged)
            // Kirim ke server
            const formData = new FormData();
            formData.append("file", audioBlob, "recording.webm");
            formData.append("userLogged", userLogged);
            formData.append("roomId", roomId);

            try {
              const res = await fetch("/api/secure/chat/upload-audio", {
                method: "POST",
                body: formData,
              });

              if (res.ok) {
                console.log("Audio berhasil dikirim");
              } else {
                console.error("Gagal kirim audio");
              }
            } catch (err) {
              console.error("Error kirim audio:", err);
            }

            // Reset
            audioChunks.current = [];
          };

          setMediaRecorder(recorder);
        })
        .catch((err) => {
          console.error("Gagal akses mikrofon:", err);
        });
    }
  }, [roomId, userLogged]);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      audioChunks.current = [];
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-2 box-border">
      {!isRecording ? (
        <button onClick={startRecording} className="text-white text-lg">
          <FaMicrophone />
        </button>
      ) : (
        <button onClick={stopRecording} className="text-red-500 text-lg">
          <FaMicrophoneSlash />
        </button>
      )}
    </div>
  );
}
