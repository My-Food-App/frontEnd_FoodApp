import { io } from "socket.io-client";
import {ip} from '../../ipconfig';
 const socket = io.connect(`http://${ip}:3005`);
  export default socket