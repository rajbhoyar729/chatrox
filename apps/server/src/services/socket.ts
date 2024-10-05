import { Server } from "socket.io";
import{ Redis} from 'ioredis';


const  pub=new Redis({
  host :'redis-19716.c56.east-us.azure.redns.redis-cloud.com',
  port:19716,
  username:'default',
  password: process.env.Redispassword
});
const sub=new Redis({
    host :'redis-19716.c56.east-us.azure.redns.redis-cloud.com',
    port:19716,
    username:'default',
    password: process.env.Redispassword
  });

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
    sub.subscribe('MESSAGES');

    }

    public initListeners(){

         const io= this._io;
         console.log("Init Socket Listeners...");


         io.on("connection", (socket) => {
            console.log("new Socket Connected" ,socket.id);

            socket.on('event:message',async( {message}:{message:string}) =>{
                console.log('New Message Rec..' , message);

                await pub.publish('MESSAGES',JSON.stringify({message}));
            });
    });
    sub.on('message', async (channel, message) => {
      if(channel==='MESSAGES'){
      io.emit('message',message);
      }
    });
}
     get io() {
      return this._io;
    }
    }

export default SocketService;