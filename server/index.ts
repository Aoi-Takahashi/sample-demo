import express, { Application, Request, Response } from 'express'
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import morgan from 'morgan';

const app: Application = express()
const PORT = 3001
config()

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.emit("confirmation", "connected!");

  socket.on("event", (data) => {
    console.log(socket.id, data);
    socket.emit("event", "pong");
  });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"));

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");


app.get('/', async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: 'Hello World!',
  })
})

const port = process.env.PORT || PORT;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});


