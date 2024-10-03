import { Server } from "socket.io";

class SocketService {
     private _io: Server;
    constructor() {
      console.log("Init Socket Service...");
      this._io = new Server({
            cors: {
                allowedHeaders:["*"],
                origin:"*",
        },
    }
      );
    }

    public initListeners(){
         const io= this._io;
         console.log("Init Socket Listeners...");
         io.on("connection", (socket) => {
            console.log("new Socket Connected" ,socket.id);

            socket.on('event:message',async( {message}:{message:string}) =>{
                console.log('New Mwssage Rec..' , message);
            })
    });
}
     get io() {
      return this._io;
    }
    }

export default SocketService;