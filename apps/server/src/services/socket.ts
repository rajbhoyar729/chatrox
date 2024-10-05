import { Server } from "socket.io";
import{ Redis} from 'ioredis';

require('dotenv').config();
const createRedisClient = (name: string) => {
  const client = new Redis({
    host: 'redis-19716.c56.east-us.azure.redns.redis-cloud.com',
    port: 19716,
    username: 'default',
    password: process.env.Redispassword
  });

  client.on('error', (err) => {
    console.error(`Redis ${name} Error:`, err);
  });

  client.on('connect', () => {
    console.log(`Redis ${name} connected successfully`);
  });

  return client;
};

const pub = createRedisClient('Publisher');
const sub = createRedisClient('Subscriber');

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