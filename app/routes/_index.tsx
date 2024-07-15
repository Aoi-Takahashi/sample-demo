import { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useSocket } from "~/context";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("event", (data) => {
      console.log(data);
    });

    socket.emit("event", "ping");
  }, [socket]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix + Socket.io</h1>
      <div>
        <button type="button" onClick={() => socket?.emit("event", "ping")}>
          Send ping
        </button>
      </div>
      <p>See Browser console and Server terminal</p>
    </div>
  );
}
