import { getUser } from "$lib/utils/cache";
import { redirect } from "@sveltejs/kit";
import { io } from "socket.io-client";


export function load () {
    const user = getUser()
    if(!user) {
          throw redirect(302, '/login'); 
    }
        const socket = io("http://localhost:3001");
        socket.emit("user_connected", user.id);
    
        return socket;
}