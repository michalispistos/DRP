import { io } from "socket.io-client";

const URL = "*";
const socket = io(URL, { autoConnect: false });

socket.on("connect_error", (err) => {
  if (err.message) {
    console.log("error");
  }
});

socket.onAny((event, ...args) => {
    console.log(event, args);
  });

export default socket;