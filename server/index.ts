import express, { Application, Request, Response } from 'express'
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import morgan from 'morgan';

const PORT = process.env.PORT || 3000;

config()
const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"));
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");


const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.emit("confirmation", "connected!");

  socket.on("event", (data) => {
    console.log(socket.id, data);
    socket.emit("event", "pong");
  });
});

app.get('/', async (_req: Request, res: Response) => {
  return res.status(200).send(
    JSON.stringify({
        message: 'Hello World!',
    }),
  )
})


httpServer.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`);
});


