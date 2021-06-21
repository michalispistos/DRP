import { io } from "socket.io-client";

const URL = "http://localhost:5000";
const socket = io(URL, { autoConnect: false });

socket.on("connect_error", (err) => {
  if (err.message) {
    console.log("error");
  }
});

export default socket;