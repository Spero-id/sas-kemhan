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